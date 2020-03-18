import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom';

// app imports
import Main from 'Main';
import configureStore from 'state/configureStore';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}><Main /></Provider>,
  document.getElementById('main'),
);
