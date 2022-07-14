import React from 'react';
import InterviewerListItem from './InterviewerListItem';
import 'components/InterviewerList.scss';

export default function interviewerList(props) {

  const interviewer = props.interviewers.map((onePerson) => {
    return (
      <InterviewerListItem
        key={onePerson.id}
        id={onePerson.id}
        name={onePerson.name}
        avatar={onePerson.avatar}
        selected={props.interviewer === onePerson.id}
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
