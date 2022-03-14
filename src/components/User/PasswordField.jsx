import React from 'react';

import FormError from '../Voyage/FormError';
import Details from '../Details';

const PasswordField = ({ handleChange, formData = {}, errors = {} }) => (
  <>
    <div id="password" className={`govuk-form-group govuk-!-margin-bottom-2 ${errors.password ? 'govuk-form-group--error' : ''}`}>
      <label className="govuk-label" htmlFor="password-field">
        Create password
      </label>
      <FormError error={errors.password} />
      <input
        className="govuk-input"
        name="password"
        id="password-field"
        data-testid="password-field"
        type="password"
        value={formData.password || ''}
        onChange={handleChange}
      />
    </div>

    <Details summary="Help choosing a valid password">
      Your password must

      <ul>
        <li>be at least 8 characters</li>
        <li>include 3 of the following: an uppercase letter, a lowercase letter, a symbol, a number</li>
      </ul>
    </Details>

    <div id="confirmPassword" className={`govuk-form-group ${errors.confirmPassword ? 'govuk-form-group--error' : ''}`}>
      <label className="govuk-label" htmlFor="confirmPassword-field">
        Confirm password
      </label>
      <FormError error={errors.confirmPassword} />
      <input
        className="govuk-input"
        id="confirmPassword-field"
        data-testid="confirmPassword-field"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword || ''}
        onChange={handleChange}
      />
    </div>
  </>
);

export default PasswordField;
