import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Nav = () => {
  const location = useLocation();
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
    {
      urlStem: '/signout',
      text: 'Sign out',
      active: false,
    },
  ];

  const setActivePage = (url) => {
    const tempArr = [...navData];
    tempArr.map((elem, i) => {
      const currentUrl = !url ? location.pathname : url;
      if (currentUrl === elem.urlStem) {
        elem.active = true;
      } else {
        elem.active = false;
      }
    });
    setNavArray(tempArr);
  };

  useEffect(() => {
    setActivePage();
  }, []);

  return (
    <nav>
      <ul id="navigation" className="govuk-header__navigation " aria-label="Top Level Navigation">

        {navArray.map((elem, i) => {
          const activeState = elem.active === true ? 'govuk-header__navigation-item govuk-header__navigation-item--active' : 'govuk-header__navigation-item';
          return (
          <li className={activeState} key={i}>
            <Link to={elem.urlStem} className="govuk-header__link" onClick={(e) => setActivePage(elem.urlStem)}>{elem.text}</Link>
          </li>
          );
        })}

      </ul>
    </nav>
  );
};

export default Nav;
