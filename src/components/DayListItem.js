// classnames library to help compose the list of classes for the button element
import classNames from 'classnames';
import './DayListItem.scss';
import React from 'react';

export default function DayListItem(props) {

  /* Props of DayListItem
    name:String the name of the day
    spots:Number the number of spots remaining
    selected:Boolean true or false declaring that this day is selected
    setDay:Function accepts the name of the day eg. "Monday", "Tuesday"  */
  const { name, spots, selected, setDay } = props;

  const dayClass = classNames('day-list__item', {
    'day-list__item--selected': props.selected === true,
    'day-list__item--full': props.spots === 0,
  });

  const formatSpots = (remainingSpots) => {
    if (props.spots === 0) {
      return 'no spots remaining';
    } else if (props.spots === 1) {
      return `${remainingSpots} spot remaining`;
    } else {
      return `${remainingSpots} spots remaining`;
    }
  };

  return (
    // <li> represents the entire day item
    <li className={dayClass} oncClick={() => props.setDay(props.name)}>
      {/* <h2> should display the day name */}
      <h2 className="text--regular">{props.name}</h2>

      {/* <h3> should display the spots remaining for a day */}
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}
