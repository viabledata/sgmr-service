import React, { useEffect, useState } from 'react';

const PersonForm = ({ type, source }) => {
  const [title, setTitle] = useState();

  useEffect(() => {
    if (type === 'edit') { source = 'edit'; }
    switch (source) {
      case 'onboarding':
        setTitle('Add details of a person you frequently sail with');
        break;
      case 'voyage':
        setTitle('Add details of the person you are sailing with');
        break;
      case 'edit':
        setTitle('Update details of the person you sail with');
        break;
      default:
        setTitle('Add details of the person you frequently sail with');
    }
  }, [source]);

  document.title = type === 'edit' ? 'Edit person' : 'Save person';

  return (
    <div className="govuk-width-container ">
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" id="main-content" role="main">
        <div className="govuk-width-container">
          <h1 className="govuk-heading-l">{title}</h1>
        </div>
      </main>
    </div>
  );
};

export default PersonForm;
