import './lib/polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';
// App imports
import Main from './components/Main';

ReactGA.initialize('G-5Q6EZYQ2BV');

ReactDOM.render(
  <BrowserRouter><Main /></BrowserRouter>,
  document.getElementById('main'),
);
