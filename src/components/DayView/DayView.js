import React, { useState }  from 'react';
import { useParams } from 'react-router-dom';
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import Button from "@material-ui/core/Button";
import * as moment from 'moment';
import * as day1data from "../../mock-data/day_1";
import './DayView.css';

export default function DayView() {
    const [timeslots, setTimeSlots] = useState({});
    const [selectedActivity, setSelectedAtivity] = useState('');
    const [showActivityDetails, setShowActivityDetails] = useState(false);

    let { date } = useParams();
    const dateStart = moment(day1data.timeslots[0].start);
    const dayBeforeStart = moment(day1data.timeslots[0].start).date(dateStart.date()-1);
    const dateObj = moment(date);

    const getActivitiesByStartHr = () => {
        let tempObj = {};
        for(let [key, val] of Object.entries(day1data.timeslots)){
            tempObj = {...tempObj, [moment(val.start).hour()]: day1data.timeslots[key]};
        }
        setTimeSlots(tempObj);
    }

    const toggleShowActivityDetails = (e) => {
        if(e.currentTarget.value !== '') {
            setSelectedAtivity(e.currentTarget.value);
            setShowActivityDetails(true);
        }
    }

    const RenderRows = () => {
        return (
            [...Array(24)].map((x, i) => {
                    return (
                        <div className="timeslots-list-item" key={i}>
                            <div style={{minWidth: '65px', textAlign: 'right', maxWidth: '65px'}}>
                                        <span style={{top: '-12px', left: '8px', position: 'relative'}}>
                                            {i === 0 ? ' \u00A0 ' : i < 12 ? `${i}:00 am` :
                                                i === 12 ? `${i}:00 pm` : `${i - 12}:00 pm`}
                                        </span>
                            </div>
                            <Button
                                value={timeslots.hasOwnProperty(i.toString()) ? timeslots[i].id : ''}
                                onClick={toggleShowActivityDetails}
                                style={{
                                marginLeft: '1em', paddingTop: '1em', paddingLeft: '1em',
                                paddingRight: '1em', width: '100%', borderRadius: '0px',
                                borderBottom: `${i === 23 ? '' : '1px solid black'}`}}
                            >
                                {timeslots.hasOwnProperty(i.toString()) ? timeslots[i].activity_name : ''}
                            </Button>
                        </div>
                    );
            })
        );
    }

    if(Object.values(timeslots).length === 0 && dateObj <= dateStart && dateObj > dayBeforeStart) {
        getActivitiesByStartHr();
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
                {showActivityDetails === true ? <ActivityDetails activityId={selectedActivity}/> : ''}
            </div>
        </div>
    );
}
