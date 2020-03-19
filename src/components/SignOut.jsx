import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// App imports
import { apiUrl } from 'config';
import Auth from 'Auth';

function SignOut() {
  const history = useHistory();

  axios.post(`${apiUrl}/logout`)
    .then((resp) => {
      console.log(resp);
      Auth.logout();
      history.push('/sign-in');
    })
    .catch((err) => console.log(err));
}

export default SignOut;
