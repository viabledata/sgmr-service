import './lib/polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// App imports
import Main from './components/Main';

ReactDOM.render(
  <BrowserRouter><Main /></BrowserRouter>,
  document.getElementById('main'),
);
