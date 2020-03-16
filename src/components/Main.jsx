import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// app imports
import ScrollToTop from 'ScrollToTop';
import SecureRoute from 'SecureRoute';

import Banner from 'Banner';
import Footer from 'Footer';
import Header from 'Header';
import PageContainer from 'PageContainer';

import SignIn from 'SignIn';
import UserRegister from 'UserRegister';

import EditAccount from 'EditAccount';
import FormPeople from 'FormPeople';
import FormVessels from 'FormVessels';
import FormVoyage from 'FormVoyage';


const Main = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Banner />
      <Switch>
        <SecureRoute exact path="/reports">
          <PageContainer />
        </SecureRoute>
        <SecureRoute exact path="/save-voyage/page-1"><FormVoyage /></SecureRoute>
        <SecureRoute exact path="/save-voyage/page-2"><FormVoyage /></SecureRoute>
        <SecureRoute exact path="/save-voyage/page-3"><FormVoyage /></SecureRoute>
        <SecureRoute exact path="/save-voyage/page-4"><FormVoyage /></SecureRoute>
        <SecureRoute exact path="/save-voyage/page-5"><FormVoyage /></SecureRoute>
        <SecureRoute exact path="/vessels">
          <PageContainer />
        </SecureRoute>
        <SecureRoute exact path="/vessels/save-vessel">
          <FormVessels />
        </SecureRoute>
        <SecureRoute exact path="/people">
          <PageContainer />
        </SecureRoute>
        <SecureRoute exact path="/people/save-person">
          <FormPeople />
        </SecureRoute>
        <SecureRoute exact path="/account">
          <PageContainer />
        </SecureRoute>
        <SecureRoute exact path="/account/edit">
          <EditAccount />
        </SecureRoute>
        <SecureRoute exact path="/signout">
          <PageContainer />
        </SecureRoute>
        <Route exact path="/sign-in">
          <SignIn />
        </Route>
        <Route exact path="/register">
          <UserRegister />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default Main;
