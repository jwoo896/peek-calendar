import React, { useState } from 'react';
import Calendar from 'react-calendar';
import * as day1data from '../../mock-data/day_1';
import './CalendarView.css';

export default function CalendarView(props) {
    const [date, setDate] = useState({
        date: new Date()
    });

    const navigateToDay = (e) => {
        console.log(e);
        //navigate to day view
        props.history.push(`/date/${e}`);
    };

    return (
        <div>
            <Calendar
                onClickDay={navigateToDay}
            />

        </div>
    );
}
