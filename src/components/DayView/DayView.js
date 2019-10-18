import React, { useState }  from 'react';
import { useParams } from 'react-router-dom';
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import { makeStyles } from '@material-ui/core/styles';
import * as moment from 'moment';
import * as day1data from "../../mock-data/day_1";
import './DayView.css';

export default function DayView() {
    const [timeslots, setTimeSlots] = useState([]);
    const dateStart = moment(day1data.timeslots[0].start);
    const dayBeforeStart = moment(day1data.timeslots[0].start).date(dateStart.date()-1);
    let { date } = useParams();
    const dateObj = moment(date);
    if(timeslots.length === 0 && dateObj <= dateStart && dateObj > dayBeforeStart) {
        setTimeSlots(day1data.timeslots);
    }
    console.log(timeslots);
    const renderActivityDetails = () => {
        //will return JSX for activity details
    };

    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            height: 400,
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        }
    }));

    const RenderRows = () => {
        return (
            [...Array(24)].map((x, i) => {
                    return (
                        <div className="timeslots-list-item">
                            <div style={{minWidth: '65px', textAlign: 'right', maxWidth: '65px'}}>
                                        <span style={{top: '-12px', left: '8px', position: 'relative'}}>
                                            {i === 0 ? ' \u00A0 ' : i < 12 ? `${i}:00 am` :
                                                i === 12 ? `${i}:00 pm` : `${i - 12}:00 pm`}
                                        </span>
                            </div>
                            <div style={{
                                marginLeft: '1em', paddingTop: '1em', paddingLeft: '1em',
                                paddingRight: '1em', borderBottom: `${i === 23 ? '' : '1px solid black'}`
                            }}>
                                some activity
                            </div>
                        </div>
                    );
            })
        );
    }

    return (
        <div className="day-view-container">
            <div className="timeslots-container">
                <h2>{dateObj.format("dddd, MMMM Do YYYY")}</h2>
                <div className="timeslots-list">
                    {RenderRows()}
                </div>
            </div>
            <div className="activity-details-container"> {/*this will be be hidden unless an activity is selected*/}
                <ActivityDetails/>
            </div>
        </div>
    );
}
