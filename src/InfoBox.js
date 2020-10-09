import { Typography, Card, CardContent } from '@material-ui/core'
import React from 'react'

function InfoBox({title, cases, total}) {
    return (
        <Card>
            <CardContent>
                {/*tITLE */}
                <Typography color="textSecondary">{title}</Typography>

                {/*+120k CASES */}
                <h2 className="infoBox__cases"> {cases}</h2>
                {/*+1.4m TOTAL CASES */}
                <Typography  className="infoBox__total" color="textSecondary">
                    {total} Total
                </Typography>
                

            </CardContent>
        </Card>
    )
}

export default InfoBox
