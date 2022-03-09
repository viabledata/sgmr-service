import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import axios from 'axios';

// App imports
import { LOGOUT_URL } from '../constants/ApiConstants';
import Auth from '../lib/Auth';

const Nav = () => {
  const location = useLocation();
  const history = useHistory();
  const serviceName = 'Tell Border Force and HMRC you are sailing to or from the UK in a pleasure craft';
  const [navArray, setNavArray] = useState([]);
  const [menuState, setMenuState] = useState(false);

  const menuToggle = (e) => {
    e.preventDefault();
    setMenuState(!menuState);
  };

  const navData = [
    {
      urlStem: '/voyage-plans',
      text: 'Voyage Plans',
      active: false,
    },
    {
      urlStem: '/pleasure-crafts',
      text: 'Pleasure Crafts',
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
    {
      urlStem: '/page/help',
      text: 'Help',
      active: false,
    },
  ];

  const setActivePage = (url) => {
    const tempArr = [...navData];
    tempArr.map((elem) => {
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

  const handleSignout = () => {
    axios({
      method: 'post',
      url: LOGOUT_URL,
      headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
    })
      .then(() => {
        setActivePage('/voyage-plans');
        Auth.logout();
        sessionStorage.clear();
        history.push('/sign-in');
      })
      .catch(() => {
        setActivePage('voyage-plans');
        Auth.logout();
        history.push('/sign-in');
      });
  };

  useEffect(() => {
    setActivePage();
  }, []);

  return (
    <div className="govuk-header__content">
      <Link className="govuk-header__link govuk-header__link--service-name" to="/">
        {serviceName}
      </Link>

      {Auth.isAuthorized() && (
        <nav aria-label="Menu" className="govuk-header__navigation ">
          <button
            type="button"
            onClick={(e) => menuToggle(e)}
            className={
              menuState === false
                ? 'govuk-header__menu-button govuk-js-header-toggle'
                : 'govuk-header__menu-button govuk-js-header-toggle govuk-header__menu-button--open'
            }
            aria-controls="navigation"
            aria-label="Show or hide navigation menu"
            aria-expanded="false"
          >
            Menu
          </button>
          <ul
            id="navigation"
            className={
              menuState === false
                ? 'govuk-header__navigation-list'
                : 'govuk-header__navigation-list govuk-header__navigation-list--open'
            }
            aria-label="Top Level Navigation"
          >
            {navArray.map((elem) => {
              const activeState = elem.active === true ? 'govuk-header__navigation-item govuk-header__navigation-item--active' : 'govuk-header__navigation-item';
              return (
                <li className={activeState} key={elem.urlStem}>
                  <Link to={elem.urlStem} className="govuk-header__link" onClick={() => setActivePage(elem.urlStem)}>{elem.text}</Link>
                </li>
              );
            })}
            <li className="govuk-header__navigation-item">
              <a href="#sign-out" className="govuk-header__link" aria-label="Sign out link" onClick={() => handleSignout()}>Sign out</a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Nav;
