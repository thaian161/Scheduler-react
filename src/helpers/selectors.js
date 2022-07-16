//Return an array of appointments for a specfic day
export function getAppointmentsForDay(state, day) {
  const emptyArray = [];

  //Check to see if "day" is available in the State Obj
  const checkIfDayMatchWithNameInDaysObj = state.days.find(
    (nameOfDays) => nameOfDays.name === day
  );

  //if day is available/ truthy then map it to get the Array of Appointments using appointments.id
  if (checkIfDayMatchWithNameInDaysObj) {
    const appointmentsArray = checkIfDayMatchWithNameInDaysObj.appointments.map(
      (id) => state.appointments[id]
    );

    return appointmentsArray;
  }
  if (checkIfDayMatchWithNameInDaysObj === undefined) {
    return emptyArray;
  }
}
