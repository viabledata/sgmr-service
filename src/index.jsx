import './lib/polyfills';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// App imports
import Main from './components/Main';

ReactDOM.render(
  <Router><Main /></Router>,
  document.getElementById('main'),
);
