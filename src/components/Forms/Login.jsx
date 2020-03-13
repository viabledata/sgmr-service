import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const history = useHistory();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({ field: '' });


  const removeError = (fieldName) => {
    const tempArr = { ...errors };
    const key = fieldName;
    delete tempArr[key];
    setErrors(tempArr);
  };

  // Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    removeError(e.target.name);
    // For login page, always remove 'main' error if it exists
    removeError('main');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/v1/login', formData)
      .then((resp) => console.log(resp))
      .catch((err) => {
        switch (err.response.data.message) {
          case 'Email or password invalid': setErrors({ ...errors, main: 'Email or password invalid' }); break;
          default: setErrors(err.response.data);
        }
      });
  };


  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <form>
              <h1 className="govuk-heading-xl">Sign in</h1>

              {Object.keys(errors).length > 1 && (
                <div className="govuk-error-summary" aria-labelledby="error-summary-title" role="alert" tabIndex="-1" data-module="govuk-error-summary">
                  <h2 className="govuk-error-summary__title" >
                    There is a problem
                  </h2>
                  <div className="govuk-error-summary__body">
                    <ul className="govuk-list govuk-error-summary__list">
                      {Object.entries(errors).map((elem, i) => (
                        <li key={i}>
                          {elem[0] !== 'title'
                              && <a href={`#${elem[0]}`}>{elem[1]}</a>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              <div id="email" className="govuk-form-group">
                <label className="govuk-label govuk-label--m" htmlFor="email">
                  Registered email address
                </label>
                <span className="govuk-hint">Enter the email address you used when you created your account</span>
                <input
                  className="govuk-input"
                  name="email"
                  type="text"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <div id="password" className="govuk-form-group">
                <label className="govuk-label govuk-label--m" htmlFor="password">
                  Password
                </label>
              <input
                  className="govuk-input"
                  name="password"
                  type="password"
                  onChange={(e) => handleChange(e)}
                />
              </div>

              <button
                type="submit"
                className="govuk-button"
                onClick={(e) => handleSubmit(e)}
              >
                Sign in
              </button>
            </form>
            <h3 className="govuk-heading-m">Need to create an account?</h3>
            <p className="govuk-body"><Link to="/register">Create an account</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
