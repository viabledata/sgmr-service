import React from 'react';

const SectionTabs = (props) => {
  return (
    <div className="govuk-width-container">
      <h1>{props.page.pathname} is this page</h1>
    </div>
  );
};

export default SectionTabs;
