import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';

// app imports
import Auth from 'Auth';

const Nav = () => {
  const location = useLocation();
  const history = useHistory();
  const [navArray, setNavArray] = useState([]);
  const [mobileMenuOpen, setMobileMenu] = useState({ mobileMenuOpen: false });
  const serviceName = 'Submit an Advanced Voyage Report';
  const serviceHome = '';

  const navData = [
    {
      urlStem: '/reports',
      text: 'Reports',
      active: false,
    },
    {
      urlStem: '/vessels',
      text: 'Vessels',
      active: false,
    },
    {
      urlStem: '/people',
      text: 'People',
      active: false,
    },
    {
      urlStem: '/account',
      text: 'Account',
      active: false,
    },
  ];

  const setActivePage = (url) => {
    const tempArr = [...navData];
    tempArr.map((elem, i) => {
      const currentUrl = !url ? location.pathname : url;
      if (currentUrl === elem.urlStem) {
        elem.active = true;
        document.activeElement.blur();
      } else {
        elem.active = false;
      }
    });
    setNavArray(tempArr);
  };

  const toggleMobileMenu = () => {
    // mobileMenuOpen === false ? setMobileMenu({ mobileMenuOpen: true }) : false;
    // console.log(newState)
    // setMobileMenu({ mobileMenuOpen: newState });
  };

  const handleSignout = () => {
    Auth.logout();
    history.push('/');
  };

  useEffect(() => {
    setActivePage();
  }, []);

  console.log(mobileMenuOpen);

  return (
    <nav>
      <div className="govuk-header__content">
          <a className="govuk-header__link govuk-header__link--service-name" href={serviceHome}>{serviceName}</a>
          <button
            type="button"
            role="button"
            className={`govuk-header__menu-button js-header-toggle ${mobileMenuOpen ? 'is-active' : ''}`}
            aria-controls="navigation"
            aria-label="Show or hide Top Level Navigation"
            onClick={() => toggleMobileMenu()}>
            Menu
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
          </button>


      {Auth.isAuthorized() && <ul id="navigation" className="govuk-header__navigation " aria-label="Top Level Navigation">

        {navArray.map((elem, i) => {
          const activeState = elem.active === true ? 'govuk-header__navigation-item govuk-header__navigation-item--active' : 'govuk-header__navigation-item';
          return (
          <li className={activeState} key={i}>
           <Link to={elem.urlStem} className="govuk-header__link" onClick={(e) => setActivePage(elem.urlStem)}>{elem.text}</Link>
          </li>
          );
        })}
        <li className='govuk-header__navigation-item'>
          <a className="govuk-header__link" onClick={() => handleSignout()}>Signout</a>
        </li>
      </ul>}
      </div>
    </nav>
  );
};

export default Nav;
