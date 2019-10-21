import React, { useState, useEffect }  from 'react';
import { useParams } from 'react-router-dom';
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import Paper from '@material-ui/core/Paper';
import * as moment from 'moment';
import * as day1data from "../../mock-data/day_1"; // In production, this would be fetched from a service
import './DayView.css';

export default function DayView() {

    // Initialize state properties
    const [timeSlots, setTimeSlots] = useState({});
    const [selectedActivity, setSelectedActivity] = useState('');
    const [showActivityDetails, setShowActivityDetails] = useState(false);

    // Initialize date variables with Moment.js
    let { date } = useParams();
    const dateStart = moment(day1data.timeslots[0].start);
    const dayBeforeStart = moment(day1data.timeslots[0].start).date(dateStart.date()-1);
    const dateObj = moment(date);

    // Set state property with available timeslots data
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

    // Template for each time slot
    const RenderRows = () => {
        return (
            [...Array(24)].map((x, i) => {
                    return (
                        <div className="time-slots-list-item" key={`time-slots-${i}`} id={`time-slots-${i}`} value={i}>
                            <div className="hour-text-wrapper">
                                        <span className="hour-text-pos">
                                            {i === 0 ? '12:00 am' : i < 12 ? `${i}:00 am` :
                                                i === 12 ? `${i}:00 pm` : `${i - 12}:00 pm`}
                                        </span>
                            </div>
                            <div
                                className="time-slots-list-item-block"
                                id={i}
                            />
                        </div>
                    );
            })
        );
    }

    // Retrieve the top and left position values of a div to determine where an Activity Tile should go
    const getOffset = (el) => {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY
        };
    }

    // Render clickable div that covers time slots
    const RenderActivityTiles = (fn) => {
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

    // Initialize state property timeSlots *once*
    if(Object.values(timeSlots).length === 0 && dateObj <= dateStart && dateObj > dayBeforeStart) {
        getActivitiesByStartHr();
    }

    // Let application know it needs to update the DOM
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
