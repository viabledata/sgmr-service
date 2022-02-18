import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const PersonForm = ({ type, source }) => {
  const location = useLocation();
  const data = location.state;
  const [errors, setErrors] = useState();
  const [formData, setFormData] = useState();
  const [title, setTitle] = useState();
  const [submittedNextPage, setSubmittedNextPage] = useState();

  document.title = type === 'edit' ? 'Edit person' : 'Save person';

  const handleChange = () => {
    console.log('change');
  };

  useEffect(() => {
    if (data?.source === 'edit') { source = 'edit'; }
    switch (source) {
      case 'onboarding':
        setTitle('Add details of a person you frequently sail with');
        break;
      case 'voyage':
        setTitle('Add details of the person you are sailing with');
        break;
      case 'edit':
        setTitle('Update details of the person you sail with');
        setSubmittedNextPage('/people');
        break;
      default:
        setTitle('Add details of the person you frequently sail with');
        setSubmittedNextPage('/people');
    }
  }, [source]);

  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-width-container ">
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-two-thirds">
              <h1 className="govuk-heading-l">{title}</h1>

              <div id="firstName" className="govuk-form-group">
                <label className="govuk-label" htmlFor="firstName">
                  Given name(s)
                </label>
                <div id="firstName-hint" className="govuk-hint">The person&apos;s first and middle names</div>
                <input
                  className="govuk-input"
                  name="firstName"
                  type="text"
                  value={formData?.firstName || ''}
                  onChange={handleChange}
                />
              </div>

              <div id="lastName" className="govuk-form-group">
                <label className="govuk-label" htmlFor="lastName">
                  Surname
                </label>
                <div id="lastName-hint" className="govuk-hint">If the person has more than one surname, enter them all</div>
                <input
                  className="govuk-input"
                  name="lastName"
                  type="text"
                  value={formData?.lastName || ''}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PersonForm;
