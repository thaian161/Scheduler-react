import React, { useState, useEffect } from 'react';
import axios from 'axios';

import 'components/Application.scss';
import DayList from './DayList';
import 'components/Appointment';
import Appointment from 'components/Appointment';

//Helper Func from selectors
import { getAppointmentsForDay } from 'helpers/selectors';

export default function Application(props) {
  //default, first rendering
  // const [day, setDay] = useState('Monday');
  // const [days, setDays] = useState([]);

  //combine the state for day, days, and appointments into a state into a single object
  const [appointments, setAppointments] = useState({});

  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
  });

  const setDay = (day) => setState({ ...state, day });

  // const setDays = (days) => {
  //   setState((prev) => ({ ...prev, days }));
  // };

  //FETCH API
  useEffect(() => {
    const fetchDayURL = axios.get('/api/days');
    const fetchAppointmentsURL = axios.get('/api/appointments');

    Promise.all([fetchDayURL, fetchAppointmentsURL]).then((responseArr) => {
      setState((prev) => ({
        ...prev,
        days: responseArr[0].data,
        appointments: responseArr[1].data,
      }));
    });
  }, []);

  //   axios.get(dayURL).then((response) => {
  //     setDays((prevDays) => {
  //       return [...prevDays, ...response.data];
  //     });
  //   });
  // }, []);

  //Helper Func: get appointments for day from selectors
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const appointment = dailyAppointments.map((appointment) => {
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
          <DayList days={state.days} value={state.day} onChange={setDay} />
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
