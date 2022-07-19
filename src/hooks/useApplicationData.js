import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useApplicationData() {
  const [state, setState] = useState({
    day: 'Monday',
    days: [],
    appointments: {},
    interviewers: {},
  });

  const setDay = (day) => setState({ ...state, day });

  //-----UPDATING SPOTS REMANINING-----
  const fancyUpdateSpots = (day, days, appointments) => {
    const currentDayIndex = days.findIndex((dayName) => dayName.name === day);

    const currentDayObject = days[currentDayIndex];
    const appointmentIDs = currentDayObject.appointments;

    let spots = 0;
    for (const id of appointmentIDs) {
      let appointment = appointments[id];
      !appointment.interview && spots++;
    }
    let newDayObj = { ...currentDayObject, spots };
    let newDaysArray = [...days];
    newDaysArray[currentDayIndex] = newDayObj;
    return newDaysArray;
  };

  //FETCH API
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((responseArr) => {
      setState((prev) => ({
        ...prev,
        days: responseArr[0].data,
        appointments: responseArr[1].data,
        interviewers: responseArr[2].data,
      }));
    });
  }, []);

  //-----BOOK INTERVIEW, created new appointment-----
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      let updateDays = fancyUpdateSpots(state.day, state.days, appointments);
      setState({
        ...state,
        appointments,
        days: updateDays,
      });
      console.log(res);
    });
  }

  //-----DELETE INTERVIEW, delete existing appointment-----
  function cancelInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`, appointment).then((res) => {
      let updateDays = fancyUpdateSpots(state.day, state.days, appointments);
      setState({
        ...state,
        appointments,
        days: updateDays,
      });
    });
  }

  return { state, setDay, bookInterview, cancelInterview };
}
