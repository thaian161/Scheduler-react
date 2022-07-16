import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';
import DayList from './DayList';
import 'components/Appointment';
import Appointment from 'components/Appointment';

//MOCK DATA
const appointments = {
  1: {
    id: 1,
    time: '12pm',
  },
  2: {
    id: 2,
    time: '1pm',
    interview: {
      student: 'Lydia Miller-Jones',
      interviewer: {
        id: 3,
        name: 'Sylvia Palmer',
        avatar: 'https://i.imgur.com/LpaY82x.png',
      },
    },
  },
  3: {
    id: 3,
    time: '2pm',
  },
  4: {
    id: 4,
    time: '3pm',
    interview: {
      student: 'Archie Andrews',
      interviewer: {
        id: 4,
        name: 'Cohana Roy',
        avatar: 'https://i.imgur.com/FK8V841.jpg',
      },
    },
  },
  5: {
    id: 5,
    time: '4pm',
  },
};

export default function Application(props) {
  //default, first rendering
  const [days, setDays] = useState([]);

  //FETCH Days API using
  useEffect(() => {
    const dayURL = '/api/days';

    axios.get(dayURL).then((response) => {
      setDays((prevDays) => {
        return [...prevDays, ...response.data];
      });
    });
  }, []);

  const appointment = Object.values(appointments).map((appointment) => {
    return <Appointment key={appointment.id} {...appointment} />;
  });

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
          <DayList days={days} value={days} onChange={setDays} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">{appointment}</section>
    </main>
  );
}
