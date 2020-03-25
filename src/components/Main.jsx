import React from 'react';
import { Route, Switch } from 'react-router-dom';

// app imports
import ScrollToTop from 'ScrollToTop';
import SecureRoute from 'SecureRoute';

import Banner from 'Banner';
import Footer from 'Footer';
import Header from 'Header';
import PageContainer from 'PageContainer';

import SignIn from 'SignIn';
import UserInputCode from 'UserInputCode';
import UserRegister from 'UserRegister';
import UserResendCode from 'UserResendCode';

import EditAccount from 'EditAccount';
import FormPeople from 'FormPeople';
import FormVoyage from 'FormVoyage';
import FormVoyageSubmitted from 'FormVoyageSubmitted';
import Vessels from 'Vessels';


const Main = () => {
  return (
    <>
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
        <SecureRoute exact path="/save-voyage/page-6"><FormVoyage /></SecureRoute>
        <SecureRoute exact path="/save-voyage/voyage-submitted"><FormVoyageSubmitted /></SecureRoute>
        <SecureRoute exact path="/vessels">
          <PageContainer />
        </SecureRoute>
        <SecureRoute exact path="/vessels/save-vessel">
          <Vessels />
        </SecureRoute>
        <SecureRoute exact path="/people">
          <PageContainer />
        </SecureRoute>
        <SecureRoute exact path="/people/:id">
          <FormPeople />
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
        <Route exact path="/sign-in">
          <SignIn />
        </Route>
        <Route exact path="/register">
          <UserRegister />
        </Route>
        <Route exact path="/verify">
          <UserInputCode />
        </Route>
        <Route exact path="/resend-code">
          <UserResendCode />
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default Main;
