import React, { useParams } from 'react';
import ActivityDetails from "./ActivityDetails";
export default function DayView() {

    let { date } = useParams();

    const renderActivityDetails = () => {
        //will return JSX for activity details
    };

    return (
      <div>{{ date }}</div>
    );
}
