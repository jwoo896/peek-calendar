import React from 'react';
import { Route, Link } from 'react-router-dom';
import Calendar from "./components/Calendar";
import DayView from "./components/DayView";
export default(() => {
  const renderHeader = () => {
    return (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
    );
  };

  return (
      <div>
        {renderHeader()}
        <Route path="/" exact component={Calendar} />
        <Route path="/date/:date" component={DayView} />
      </div>
  );
});
