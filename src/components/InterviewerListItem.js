import React from 'react';

import 'components/InterviewerListItem.scss';

// classnames library to help compose the list of classes for the button element
import classNames from 'classnames';

export default function InterviewerListItem(props) {

  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': props.selected,
  });

  return (
    <li
      className={interviewerClass}
      onClick={props.setInterviewer}
      selected={props.selected}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}
