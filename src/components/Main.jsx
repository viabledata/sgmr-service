import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// app imports
import Footer from 'Footer';
import Header from 'Header';
import Reports from 'Reports';

export default function Main() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Reports />
        </Route>
      </Switch>
      <Footer />
    </Router>
  )
}
