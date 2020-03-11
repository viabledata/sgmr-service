import React, { useEffect, useState } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';

// app imports
import Auth from 'Auth';

const Nav = () => {
  const location = useLocation();
  const history = useHistory();
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

  const handleSignout = () => {
    Auth.logout();
    history.push('/');
  };

  useEffect(() => {
    setActivePage();
  }, []);

  return (
    <nav>
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
    </nav>
  );
};

export default Nav;
