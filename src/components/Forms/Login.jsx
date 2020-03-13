import React from 'react';
import { Link } from 'react-router-dom';

const Login = (props) => {
  console.log(props);
  return (
    <div className="govuk-width-container">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-grid-row">
          <div class="govuk-grid-column-two-thirds">
            <form>
              <h1 class="govuk-heading-xl">Sign in</h1>
              <div class="govuk-form-group">
                <label className="govuk-label govuk-label--m" for="email">Registered email address</label>
                <span className="govuk-hint">Enter the email address you used when you created your account</span>
                <input
                  class="govuk-input"
                  id="email"
                  name="email"
                  type="text"
                />
              </div>
              <button
                type="submit"
                class="govuk-button"
              >
                Sign in
              </button>
            </form>
            <h3 class="govuk-heading-m">Need to create an account?</h3>
            <p class="govuk-body"><Link to="/register">Create an account</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;
