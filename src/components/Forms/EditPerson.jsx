import React from 'react';
import { withRouter } from 'react-router-dom';

const EditPerson = (props) => {
  const personId = props.location.state.peopleId;

  console.log(personId);

  return (
    <>
      Yo
    </>
  );
};

export default withRouter(EditPerson);
