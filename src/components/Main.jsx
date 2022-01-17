import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import ScrollToTop from './ScrollToTop';
import SecureRoute from '../lib/SecureRoute';

import Banner from './Banner';
import Footer from './Footer';
import Header from './Header';
import PrivacyCookiePolicy from './PrivacyCookiePolicy';
import Help from './Help';
import AccessibilityStatement from './AccessibilityStatement';
import PageContainer from './PageContainer';

import CreateAPerson from './People/CreateAPerson';
import EditPerson from './People/EditPerson';

import SignIn from './User/SignIn';
import UserRegister from './User/UserRegister';
import EditAccount from './User/EditAccount';
import UserRegisterConfirmation from './User/UserRegisterConfirmation';
import AccountActivation from './User/AccountActivation';

import CreateAVessel from './Vessel/CreateAVessel';
import EditVessel from './Vessel/EditVessel';

import VoyageFormContainer from './Voyage/VoyageFormContainer';
import FormVoyageSubmitted from './Forms/FormVoyageSubmitted';
import UserContext from './UserContext';
import DeleteAccount from './User/DeleteAccount';
import DeleteConfirmation from './User/DeleteConfirmation';
import NewPassword from './User/NewPassword';
import ForgottenPassword from './User/ForgottenPassword';
import LandingPage from './LandingPage';
import ManageReports from './ManageReports';
import SiteMaintenance from './SiteMaintenance';
import { siteMaintenance } from '../lib/config';

const Main = () => {
  const [user, setUser] = useState(null);

  if (siteMaintenance) {
    return <SiteMaintenance />;
  }

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
          <SecureRoute exact path="/voyage-plans">
            <PageContainer />
          </SecureRoute>
          <SecureRoute exact path="/save-voyage/page-([1-7]{1})">
            <VoyageFormContainer />
          </SecureRoute>
          <SecureRoute exact path="/save-voyage/page-submitted">
            <FormVoyageSubmitted />
          </SecureRoute>
          <SecureRoute exact path="/pleasure-crafts">
            <PageContainer />
          </SecureRoute>
          <SecureRoute exact path="/pleasure-crafts/save-pleasure-craft">
            <CreateAVessel />
          </SecureRoute>
          <SecureRoute exact path="/pleasure-crafts/:vesselId">
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
          <Route exact path="/accessibility-statement">
            <AccessibilityStatement />
          </Route>
          <SecureRoute exact path="/manage-voyage-plans">
            <ManageReports />
          </SecureRoute>
        </Switch>
      </UserContext.Provider>
      <Footer />
    </>
  );
};

export default Main;
