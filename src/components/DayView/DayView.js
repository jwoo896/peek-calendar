import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import Paper from '@material-ui/core/Paper';
import * as moment from 'moment';
import * as day1data from "../../mock-data/day_1";
import './DayView.css';

export default function DayView() {

    const [timeSlots, setTimeSlots] = useState({});
    const [selectedActivity, setSelectedActivity] = useState('');
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

    const RenderShowActivityDetails = (e) => {
        const startingHrSlot = e.currentTarget.getAttribute('value');
        if(startingHrSlot != null && startingHrSlot !== '') {
            setSelectedActivity(startingHrSlot);
            if(showActivityDetails === false) setShowActivityDetails(true);
        }
    }

    const RenderRows = () => {
        return (
            [...Array(24)].map((x, i) => {
                    return (
                        <div className="time-slots-list-item" key={`time-slots-${i}`} id={`time-slots-${i}`} value={i}>
                            <div style={{textAlign: 'right', minWidth: '70px', maxWidth: '70px'}}>
                                        <span style={{top: '-9px', left: '8px', position: 'relative'}}>
                                            {i === 0 ? ' \u00A0 ' : i < 12 ? `${i}:00 am` :
                                                i === 12 ? `${i}:00 pm` : `${i - 12}:00 pm`}
                                        </span>
                            </div>
                            <div
                                className="time-slots-list-item-block"
                                id={i}
                                style={{
                                marginLeft: '1em', paddingTop: '1em', paddingLeft: '1em',
                                paddingRight: '1em', width: '100%', borderRadius: '0px',
                                borderTop: '1px solid lightgrey'}}
                            />
                        </div>
                    );
            })
        );
    }

    const getOffset = (el) => {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }


    const RenderActivityTiles = (fn) => {
        //render clickable div that covers time slots
        const startSlots = document.getElementsByClassName('time-slots-list-item-block');
        for(let [key, val] of Object.entries(timeSlots)){
            if(startSlots.hasOwnProperty(key)) {
                const activityTileOffSets = fn(startSlots.item(parseInt(key)));
                let activityTile = document.createElement('div');
                let activityTileTextNode = document.createTextNode(`${val.activity_name}`);
                activityTile.style.left = `${activityTileOffSets.left}px`;
                activityTile.style.top = `${activityTileOffSets.top}px`;
                activityTile.style.minHeight = `${(val.minute_length/60) * 50}px`;
                activityTile.setAttribute('value', `${key}`);
                activityTile.addEventListener('mouseover', () => activityTile.style.cursor = 'pointer');
                activityTile.addEventListener('click', (e) => RenderShowActivityDetails(e));
                activityTile.className = 'activity-tile';

                activityTile.appendChild(activityTileTextNode);
                document.getElementById('time-slots-list').appendChild(activityTile);
            }
        }
    }

    if(Object.values(timeSlots).length === 0 && dateObj <= dateStart && dateObj > dayBeforeStart) {
        getActivitiesByStartHr();
    }

    useEffect(() => {
        RenderActivityTiles(getOffset);
    });

    return (
        <div className="day-view-container">
            <Paper className="time-slots-container">
                <h2 style={{textAlign: 'center'}}>{dateObj.format("dddd, MMMM Do YYYY")}</h2>
                <div className="time-slots-list" id="time-slots-list">
                    {RenderRows()}
                </div>
            </Paper>
            <div className="activity-details-container"> {/*this will be be hidden unless an activity is selected*/}
                {showActivityDetails === true ? <ActivityDetails activityDetails={timeSlots[selectedActivity]}/> : ''}
            </div>
        </div>
    );
}
