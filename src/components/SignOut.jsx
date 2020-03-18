import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// App imports
import { apiPath } from 'config';
import Auth from 'Auth';

function SignOut() {
  const history = useHistory();

  axios.post(`${apiPath}/logout`)
    .then((resp) => {
      console.log(resp);
      Auth.logout();
      history.push('/sign-in');
    })
    .catch((err) => console.log(err));
}

export default SignOut;
