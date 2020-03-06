import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// app imports
import Banner from 'Banner';
import Footer from 'Footer';
import Header from 'Header';
import PageContainer from 'PageContainer';
import FormVessels from 'FormVessels';
import FormPeople from 'FormPeople';


const Main = () => {
  return (
    <Router>
      <Header />
      <Banner />
      <Switch>
        <Route exact path="/reports">
          <PageContainer />
        </Route>
        <Route exact path="/vessels">
          <PageContainer />
        </Route>
        <Route exact path="/vessels/save-vessel">
          <FormVessels />
        </Route>
        <Route exact path="/people">
          <PageContainer />
        </Route>
        <Route exact path="/people/save-person">
          <FormPeople />
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
