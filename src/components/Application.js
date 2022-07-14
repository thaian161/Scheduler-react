import React, { useState } from 'react';

import 'components/Application.scss';
import DayList from './DayList';

export default function Application(props) {
  //default, first rendering
  const [day, setDay] = useState('Monday');

  //setDay("Tuesday")

  const days = [
    {
      id: 1,
      name: 'Monday',
      spots: 2,
    },
    {
      id: 2,
      name: 'Tuesday',
      spots: 5,
    },
    {
      id: 3,
      name: 'Wednesday',
      spots: 0,
    },
  ];

  return (
    <main className="layout">
      <section className="sidebar">
        {/*Sidebar elements.*/}
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          {/* <DayList
            days={days}
            day={'Monday'}
            setDay={(day) => console.log(day)} */}
          <DayList days={days} value={day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
      </section>
    </main>
  );
}
