import React, { useState } from 'react';
import Calendar from 'react-calendar';
import * as day1data from '../../mock-data/day_1';
import './CalendarView.css';

export default function CalendarView(props) {
    const [date] = useState(new Date(day1data.timeslots[0].start)); //initialize calendar active start date with day1 mock

    const navigateToDay = (e) => {
        //navigate to day view
        props.history.push(`/date/${e}`);
    };

    return (
        <div>
            <Calendar
                onClickDay={navigateToDay}
                activeStartDate={date}
            />
        </div>
    );
}
