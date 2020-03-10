import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// app imports
import ScrollToTop from 'ScrollToTop';
import Banner from 'Banner';
import Footer from 'Footer';
import Header from 'Header';
import PageContainer from 'PageContainer';
import FormVessels from 'FormVessels';
import FormPeople from 'FormPeople';
import FormVoyage from 'FormVoyage';


const Main = () => {
  return (
    <Router>
      <ScrollToTop />
      <Header />
      <Banner />
      <Switch>
        <Route exact path="/reports">
          <PageContainer />
        </Route>
        <Route exact path="/save-voyage/page-1"><FormVoyage /></Route>
        <Route exact path="/save-voyage/page-2"><FormVoyage /></Route>
        <Route exact path="/save-voyage/page-3"><FormVoyage /></Route>
        <Route exact path="/save-voyage/page-4"><FormVoyage /></Route>
        <Route exact path="/save-voyage/page-5"><FormVoyage /></Route>
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
