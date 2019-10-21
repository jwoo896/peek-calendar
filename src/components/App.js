import React from 'react';
import { Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from "@material-ui/core";
import CalendarView from "./CalendarView/CalendarView";
import DayView from "./DayView/DayView";
import './App.css';


export default(() => {
  const renderHeader = () => {
    return (
        <AppBar position="sticky" color="secondary" className="header">
            <Toolbar>
                <Button color="inherit"><Link to="/" style={{textDecoration: 'none', color: '#fff'}}>Home</Link></Button>
            </Toolbar>
        </AppBar>
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
