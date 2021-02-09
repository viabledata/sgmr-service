import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

// app imports
import ScrollToTop from '@components/ScrollToTop';
import SecureRoute from '@lib/SecureRoute';

import Banner from '@components/Banner';
import Footer from '@components/Footer';
import Header from '@components/Header';
import PrivacyCookiePolicy from '@components/PrivacyCookiePolicy';
import Help from '@components/Help';
import FiveHundred from '@components/500';
import AccessibilityStatement from '@components/AccessibilityStatement';
import PageContainer from '@components/PageContainer';

import CreateAPerson from '@components/People/CreateAPerson';
import EditPerson from '@components/People/EditPerson';

import SignIn from '@components/User/SignIn';
import UserRegister from '@components/User/UserRegister';
import EditAccount from '@components/User/EditAccount';
import UserRegisterConfirmation from '@components/User/UserRegisterConfirmation';
import AccountActivation from '@components/User/AccountActivation';


import CreateAVessel from '@components/Vessel/CreateAVessel';
import EditVessel from '@components/Vessel/EditVessel';

import VoyageFormContainer from '@components/Voyage/VoyageFormContainer';
import FormVoyageSubmitted from '@components/Forms/FormVoyageSubmitted';
import UserContext from '@components/UserContext';
import DeleteAccount from '@components/User/DeleteAccount';
import DeleteConfirmation from '@components/User/DeleteConfirmation';
import NewPassword from '@components/User/NewPassword';
import ForgottenPassword from '@components/User/ForgottenPassword';
import LandingPage from '@components/LandingPage';
import ManageReports from '@components/ManageReports';

const Main = () => {
  const [user, setUser] = useState(null);

  return (
    <>
      <ScrollToTop />
      <UserContext.Provider value={{ user, setUser }}>
        <Header />
        <Banner />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <SecureRoute exact path="/reports">
            <PageContainer />
          </SecureRoute>
          <SecureRoute exact path="/save-voyage/page-([1-7]{1})">
            <VoyageFormContainer />
          </SecureRoute>
          <SecureRoute exact path="/save-voyage/page-submitted">
            <FormVoyageSubmitted />
          </SecureRoute>
          <SecureRoute exact path="/vessels">
            <PageContainer />
          </SecureRoute>
          <SecureRoute exact path="/vessels/save-vessel">
            <CreateAVessel />
          </SecureRoute>
          <SecureRoute exact path="/vessels/:vesselId">
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
          <SecureRoute exact path="/account/delete">
            <DeleteAccount />
          </SecureRoute>
          <Route exact path="/account/delete-confirmation">
            <DeleteConfirmation />
          </Route>
          <Route exact path="/sign-in">
            <SignIn />
          </Route>
          <Route exact path="/forgotten-password">
            <ForgottenPassword />
          </Route>
          <Route exact path="/new-password">
            <NewPassword />
          </Route>
          <Route exact path="/register">
            <UserRegister />
          </Route>
          <Route exact path="/registration-confirmation">
            <UserRegisterConfirmation />
          </Route>
          <Route exact path="/activate-account">
            <AccountActivation />
          </Route>
          <Route exact path="/privacy-and-cookie-policy">
            <PrivacyCookiePolicy />
          </Route>
          <Route exact path="/help">
            <Help />
          </Route>
          <Route exact path="/500">
            <FiveHundred />
          </Route>
          <Route exact path="/accessibility-statement">
            <AccessibilityStatement />
          </Route>
          <SecureRoute exact path="/manage-reports">
            <ManageReports />
          </SecureRoute>
        </Switch>
      </UserContext.Provider>
      <Footer />
    </>
  );
};

export default Main;
