import React from 'react';

export default function DayListItem(props) {
  return (
    // <li> represents the entire day item
    <li oncClick={() => props.setDay(props.name)}>
      {/* <h2> should display the day name */}
      <h2 className="text--regular">{props.name}</h2>

      {/* <h3> should display the spots remaining for a day */}
      <h3 className="text--light">{props.spots} spots remaining</h3>
    </li>
  );
}
