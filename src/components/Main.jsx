import React from 'react';
import { Route, Switch } from 'react-router-dom';

// app imports
import ScrollToTop from '@components/ScrollToTop';
import SecureRoute from '@lib/SecureRoute';

import Banner from '@components/Banner';
import Footer from '@components/Footer';
import Header from '@components/Header';
import PageContainer from '@components/PageContainer';

import SignIn from '@components/Forms/SignIn';
import UserInputCode from '@components/Forms/UserInputCode';
import UserRegister from '@components/Forms/UserRegister';
import UserResendCode from '@components/Forms/UserResendCode';

import EditAccount from '@components/Forms/EditAccount';
import EditPerson from '@components/People/EditPerson';
import CreateAPerson from '@components/People/CreateAPerson';
import FormVoyage from '@components/Forms/FormVoyage';
import FormVoyageSubmitted from '@components/Forms/FormVoyageSubmitted';
import CreateAVessel from '@components/Vessel/CreateAVessel';
import EditVessel from '@components/Vessel/EditVessel';


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
          <CreateAVessel />
        </SecureRoute>
        <SecureRoute exact path="/vessels/edit-vessel">
          <EditVessel />
        </SecureRoute>
        <SecureRoute exact path="/people">
          <PageContainer />
        </SecureRoute>
        <SecureRoute exact path="/people/save-person">
          <CreateAPerson />
        </SecureRoute>
        <SecureRoute exact path="/people/edit-person">
          <EditPerson />
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
