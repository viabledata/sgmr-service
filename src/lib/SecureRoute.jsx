import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// app imports
import Auth from './Auth';

// Create a secure route you can only see when logged in
const SecureRoute = (props) => {
  if (Auth.isAuthorized()) return <Route {...props} />;
  return <Redirect to={`/sign-in?source=${location.pathname.substring(1)}`} />;
};

export default SecureRoute;
