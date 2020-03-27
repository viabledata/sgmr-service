import axios from 'axios';
import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { createRoutine } from 'redux-saga-routines';

import Auth from 'Auth';
import { redirectToSignIn } from './redirectToSignIn';


export const submitSignOut = createRoutine('SUBMIT_SIGNOUT');


const createSignOutRequest = async () => {
  const data = await axios.post(USER_SIGN_OUT_URL, {}, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  });

  return data;
};
