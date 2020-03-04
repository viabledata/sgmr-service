import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// app imports
import Footer from 'Footer';
import Header from 'Header';
import PageContainer from 'PageContainer';


const Main = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/reports">
          <PageContainer />
        </Route>
        <Route exact path="/vessels">
          <PageContainer />
        </Route>
        <Route exact path="/people">
          <PageContainer />
        </Route>
        <Route exact path="/account">
          <PageContainer />
        </Route>
        <Route exact path="/signout">
          <PageContainer />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default Main;
