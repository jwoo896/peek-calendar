import React from 'react';
import { Route, Link } from 'react-router-dom';
import CalendarView from "./components/CalendarView/CalendarView";
import DayView from "./components/DayView/DayView";
import './App.css';


export default(() => {
  const renderHeader = () => {
    return (
        <div className="header">
            <Link className="link" to="/">Home</Link>
        </div>
    );
  };

  return (
      <div>
        {renderHeader()}
        <Route path="/" exact component={CalendarView} />
        <Route path="/date/:date" component={DayView} />
      </div>
  );
});
