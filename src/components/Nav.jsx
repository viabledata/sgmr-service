import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import axios from 'axios';

// App imports
import Auth from '@lib/Auth';
import { LOGOUT_URL } from '@constants/ApiConstants';

const Nav = () => {
  const location = useLocation();
  const history = useHistory();
  const serviceName = 'Submit an Advanced Voyage Report';
  const [navArray, setNavArray] = useState([]);

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
        Auth.logout();
        localStorage.clear();
        history.push('/sign-in');
      })
      .catch(() => {
        Auth.logout();
        history.push('/sign-in');
      });
  };

  useEffect(() => {
    setActivePage();
  }, []);

  return (
    <div className="govuk-header__content">
      <p className="govuk-header__link govuk-header__link--service-name">{serviceName}</p>

      <button
        type="button"
        className="govuk-header__menu-button govuk-js-header-toggle"
        aria-controls="navigation"
        aria-label="Show or hide navigation menu"
      >
        Menu
      </button>

      {Auth.isAuthorized() && (
        <nav>
          <ul id="navigation" className="govuk-header__navigation " aria-label="Top Level Navigation">
            {navArray.map((elem) => {
              const activeState = elem.active === true ? 'govuk-header__navigation-item govuk-header__navigation-item--active' : 'govuk-header__navigation-item';
              return (
                <li className={activeState} key={elem.urlStem}>
                  <Link to={elem.urlStem} className="govuk-header__link" onClick={() => setActivePage(elem.urlStem)}>{elem.text}</Link>
                </li>
              );
            })}
            <li className="govuk-header__navigation-item">
              <a href="#sign-out" className="govuk-header__link" onClick={() => handleSignout()}>Signout</a>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Nav;
