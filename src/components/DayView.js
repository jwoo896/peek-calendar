import React  from 'react';
import { useParams } from 'react-router-dom';
import ActivityDetails from "./ActivityDetails";
export default function DayView() {

    let { date } = useParams();
    const renderActivityDetails = () => {
        //will return JSX for activity details
    };

    return (
      <div>{date}</div>
    );
}
