import React, { useState, useEffect } from "react";
import { MenuItem, FromControl, Select, FormControl,Card, CardContent  } from "@material-ui/core";
import InfoBox from "./InfoBox";
import Map from "./Map";
import Table from './Table';
import { sortData } from "./util";
import LineGraph from './LineGraph';

import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [ countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  useEffect( () =>
    {
      fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data =>
        {
          setCountryInfo(data);
        })
    },[]
  )
  //STATE= how to write a variable in REACT
  //https://disease.sh/v3/covid-19/countries
  //USEEFFECT= Run a piece of Code
  // based on a given condition
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData= sortData(data);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountriesData();
  }, []);
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
    setCountry(countryCode);
    const url = countryCode === 'worldwide' ?  'https://disease.sh/v3/covid-19/all' 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
     
    await fetch(url)
    .then(response => response.json())
    .then(data =>{
      setCountry(countryCode)
      // all the data from the country
      setCountryInfo(data)
    });
  };
  console.log('Country Info>>>>>',countryInfo);

  return (
    <div className="App">
      <div className="app__left">
        <div className="app_header">
          <h1>COVID-19 TRACKER</h1>
          {/*Header  */}
          {/*Title select input dropdown field */}
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}> {country.name}</MenuItem>
              ))}

              {/*  Loop through all the countries */}
              {/* <MenuItem value="worldwide"> WorldWide</MenuItem>
             <MenuItem value="worldwide"> Usa</MenuItem>
             <MenuItem value="worldwide"> India</MenuItem>
             <MenuItem value="worldwide"> Germany</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          {/* infoBoxes */}
          <InfoBox title="Coronavirus cases" case={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        

          {/* infoBoxes */}
          {/* infoBoxes */}
        </div>

      
        
        {/*Map  */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3> Live cases by country</h3>
            {/*table   */}
            <Table countries={tableData}/>
            <h3>World wide new case</h3>
             {/*graps */}
             
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
