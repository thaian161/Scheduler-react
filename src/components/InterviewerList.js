import './InterviewerListItem.scss';
import React from 'react';
import InterviewerListItem from './InterviewerListItem';

export default function interviewerList(props) {
  const interviewer = props.interviewers.map((onePerson) => {
    return (
      <InterviewerListItem
        key={onePerson.id}
        name={onePerson.name}
        avatar={onePerson.avatar}
        selected={onePerson.name === props.id}
        setInterviewer={props.setInterviewer}
      />
    );
  });

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{interviewer}</ul>
    </section>
  );
}
