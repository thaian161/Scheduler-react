//-----Return an ARRAY OF APPOINTMENTS for a specfic day-----
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
  if (checkIfDayMatchWithNameInDaysObj === undefined) return emptyArray;
}

//-----Return an OBJECT OF INTERVIEW data----
export function getInterview(state, interview) {

  //if interview is truthy, return interview obj
  if (interview) {
    const student = interview.student;
    const interviewer = { ...state.interviewers[interview.interviewer] };

    return {
      student,
      interviewer,
    };
  }

  if (!interview) return null;
}
