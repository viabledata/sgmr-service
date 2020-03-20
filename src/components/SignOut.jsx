import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { LOGOUT_URL } from 'Constants/ApiConstants';
import Auth from 'Auth';

function SignOut() {
  const history = useHistory();

  axios.post(LOGOUT_URL)
    .then((resp) => {
      console.log(resp);
      Auth.logout();
      history.push('/sign-in');
    })
    .catch((err) => console.log(err));
}

export default SignOut;
