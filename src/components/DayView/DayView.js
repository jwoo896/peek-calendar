import React, { useState }  from 'react';
import { useParams } from 'react-router-dom';
import ActivityDetails from "../ActivityDetails/ActivityDetails";
import * as moment from 'moment';
import * as day1data from "../../mock-data/day_1";
export default function DayView() {
    const [timeslots, setTimeSlots] = useState([]);
    const dateStart = moment(day1data.timeslots[0].start);
    const dayBeforeStart = moment(day1data.timeslots[0].start).date(dateStart.date()-1);
    let { date } = useParams();
    const dateObj = moment(date);
    if(timeslots.length === 0 && dateObj <= dateStart && dateObj > dayBeforeStart) {
        setTimeSlots({timeSlots: day1data.timeslots});
    }
    console.log(timeslots);
    const renderActivityDetails = () => {
        //will return JSX for activity details
    };
    return (
      <div>
          <h2>{dateObj.format("dddd, MMMM Do YYYY")}</h2>
      </div>
    );
}
