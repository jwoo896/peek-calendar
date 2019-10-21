import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as moment from 'moment';
import './ActivityDetails.css';

// makeStyles is necessary to override css in Material-ui components without using !important
const useStyles = makeStyles({
    card: {
        minWidth: '45vw',
    },
    cardTitle: {
        fontSize: 30,
        textAlign: 'center',
    },
    cardMetaData: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    cardBody: {
        fontSize: 24,
    },
    spaceBottom: {
        marginBottom: 12,
    },
});

export default function ActivityDetails({ activityDetails }) {
    const classes = useStyles();

    const getHour = (time) =>{
        let timeMoment = moment(time);
        return timeMoment.hour() === 0 ? '12am' : timeMoment.hour() === 12 ? '12pm' :
            timeMoment.hour() > 12 ? `${timeMoment.hour() - 12}pm` : `${timeMoment.hour()}am`;
    }

    return (
        <div className="activity-details-card-wrapper">
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.cardTitle} variant='h5' component='h2'>
                        {activityDetails.activity_name}
                    </Typography>
                    <div className={classes.cardMetaData}>
                        <Typography className={classes.spaceBottom} color='textSecondary'>
                            {getHour(activityDetails.start)} - {getHour(activityDetails.end)}
                        </Typography>
                        <Typography className={classes.spaceBottom} color='textSecondary'>
                            Maximum guests: {activityDetails.max_guests}
                        </Typography>
                    </div>
                    <Typography className={classes.cardBody} variant='body2' component='p'>
                        {activityDetails.available_spots === 0 ? 'FULLY BOOKED' :
                            `Available Spots: ${activityDetails.available_spots}`}
                        <br />
                        Duration: {activityDetails.minute_length} min
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
