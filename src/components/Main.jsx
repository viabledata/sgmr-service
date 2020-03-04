/* eslint-disable import/no-unresolved */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// app imports
import Footer from 'Footer';
import Header from 'Header';
import PageContainer from 'PageContainer';

export default function Main() {
  return (
    <Router>
      <Header />
      <Switch>
        {/* <Route exact path="/reports">
          <Reports />
        </Route> */}
        <Route exact path="/vessels">
          <PageContainer />
        </Route>
        {/* <Route exact path="/people">
          <People />
        </Route>
        <Route exact path="/account">
          <Account />
        </Route>
        <Route exact path="/signout">
          <Signout />
        </Route> */}
      </Switch>
      <Footer />
    </Router>
  );
}
