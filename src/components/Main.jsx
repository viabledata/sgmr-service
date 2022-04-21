import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import ReactGA from 'react-ga4';
import {
  PEOPLE_URL, VESSELS_URL, VOYAGE_REPORT_URL, VOYAGE_STATUSES,
} from '../constants/ApiConstants';

import ScrollToTop from './ScrollToTop';
import SecureRoute from '../lib/SecureRoute';

import VoyageHelp from '../pages/help/Help';

import Banner from './Banner';
import Footer from './Footer';
import Header from './Header';
import PrivacyCookiePolicy from './PrivacyCookiePolicy';
import Help from './Help';
import AccessibilityStatement from './AccessibilityStatement';
import PageContainer from './PageContainer';

import PersonForm from '../pages/people/PersonForm';
import PleasureCraftForm from '../pages/pleasureCrafts/PleasureCraftForm';

import SignIn from './User/SignIn';
import UserRegister from './User/UserRegister';
import EditAccount from './User/EditAccount';
import UserRegisterConfirmation from './User/UserRegisterConfirmation';
import AccountActivation from './User/AccountActivation';

import VoyageFormContainer from './Voyage/VoyageFormContainer';
import VoyageSubmitted from '../pages/voyage/VoyageSubmitted';
import UserContext from './UserContext';
import DeleteAccount from './User/DeleteAccount';
import DeleteConfirmation from './User/DeleteConfirmation';
import ActionEntity from './ActionEntity';
import NewPassword from './User/NewPassword';
import ForgottenPassword from './User/ForgottenPassword';
import LandingPage from './LandingPage';
import ManageReports from './ManageReports';
import SiteMaintenance from './SiteMaintenance';
import { siteMaintenance } from '../lib/config';
import { AlertContextProvider } from './AlertContext';
import { patchData, deleteData } from '../utils/apiHooks';

const Main = () => {
  const [user, setUser] = useState(null);

  if (siteMaintenance) {
    return <SiteMaintenance />;
  }

  useEffect(() => {
    ReactGA.send('pageview');
  });

  return (
    <>
      <ScrollToTop />
      <UserContext.Provider value={{ user, setUser }}>
        <AlertContextProvider>
          <Header />
          <Banner />
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <SecureRoute exact path="/page/help">
              <VoyageHelp />
            </SecureRoute>
            <SecureRoute exact path="/voyage-plans/start">
              <VoyageHelp source="voyage" />
            </SecureRoute>
            <SecureRoute exact path="/voyage-plans">
              <PageContainer />
            </SecureRoute>
            <SecureRoute exact path="/save-voyage/page-([1-7]{1})">
              <VoyageFormContainer />
            </SecureRoute>
            <SecureRoute exact path="/voyage-plans/:entityId/delete">
              <ActionEntity
                notification={
                  {
                    title: 'Success',
                    heading: 'Voyage plan has been successfully cancelled.',
                    entity: 'voyage plan',
                    baseURL: VOYAGE_REPORT_URL,
                    redirectURL: '/voyage-plans',
                    apiHook: patchData,
                    apiHookConfig: [{ status: VOYAGE_STATUSES.PRE_CANCELLED }],
                    action: 'Cancel',
                  }
                }
              />
            </SecureRoute>
            <SecureRoute exact path="/save-voyage/page-submitted">
              <VoyageSubmitted />
            </SecureRoute>
            <SecureRoute exact path="/pleasure-crafts">
              <PageContainer />
            </SecureRoute>
            <SecureRoute exact path="/pleasure-crafts/save-pleasure-craft/page-([1-2]{1})">
              <PleasureCraftForm />
            </SecureRoute>
            <SecureRoute exact path="/pleasure-crafts/edit-pleasure-craft/page-([1-2]{1})">
              <PleasureCraftForm type="edit" />
            </SecureRoute>
            <SecureRoute exact path="/pleasure-crafts/:entityId/delete">
              <ActionEntity
                notification={
                  {
                    title: 'Success',
                    heading: 'Pleasure craft successfully deleted.',
                    entity: 'pleasure craft',
                    baseURL: VESSELS_URL,
                    redirectURL: '/pleasure-crafts',
                    apiHook: deleteData,
                    action: 'Delete',
                  }
                }
              />
            </SecureRoute>
            <SecureRoute exact path="/people">
              <PageContainer />
            </SecureRoute>
            <SecureRoute exact path="/people/save-person/page-([1-2]{1})">
              <PersonForm />
            </SecureRoute>
            <SecureRoute exact path="/people/edit-person/page-([1-2]{1})">
              <PersonForm type="edit" />
            </SecureRoute>
            <SecureRoute exact path="/people/:entityId/delete">
              <ActionEntity
                notification={
                  {
                    title: 'Success',
                    heading: 'Person successfully deleted.',
                    entity: 'person',
                    baseURL: PEOPLE_URL,
                    redirectURL: '/people',
                    apiHook: deleteData,
                    action: 'Delete',
                  }
                }
              />
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
        </AlertContextProvider>
      </UserContext.Provider>
      <Footer />
    </>
  );
};

export default Main;
