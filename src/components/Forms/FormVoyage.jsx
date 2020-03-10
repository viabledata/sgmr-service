import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// NOTE: form does not handle errors for now, can replicate what is done on Voyage when needed

// app imports
import FormVoyagePage1 from 'FormVoyagePage1';
import FormVoyagePage2 from 'FormVoyagePage2';

const FormVoyage = () => {
  const location = useLocation();
  const history = useHistory();
  const maxPages = 5;
  let [pageNum, setPageNum] = useState();
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || [{}]);
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { title: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const clearFormData = (e) => {
    setFormData({});
    setErrors({ title: null });
  };

  const setNextPage = () => {
    const nextPage = pageNum < maxPages ? pageNum + 1 : pageNum;
    setPageNum(nextPage);
    history.push(`/save-voyage?page=${nextPage}`);
  };

  const handleSubmit = (e) => {
    // Combine date fields into required format before submit
    e.preventDefault();
    // Clear local storage on commit as we have passed details to API
    clearFormData();
    setNextPage();
  };

  // Update localStorage to hold page data
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);

  // Set page number based on current URL
  useEffect(() => {
    const thisPage = location.search.split('page=');
    setPageNum(parseInt(thisPage[1], 10));
  });

  return (
    <div className="govuk-width-container ">
      <a className="govuk-back-link" onClick={(e) => {
        e.preventDefault();
        history.goBack();
      }}>
        Back
      </a>
      <main className="govuk-main-wrapper govuk-main-wrapper--auto-spacing" role="main">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <span className="govuk-caption-xl">{`Page ${pageNum} of ${maxPages}`}</span>
            <h1 className="govuk-heading-xl">Departure details</h1>
            <p className="govuk-body-l">Provide the departure details of the voyage</p>
            <form>

              {pageNum === 1 && <FormVoyagePage1
                  handleSubmit={(e) => handleSubmit(e)}
                  handleChange={(e) => handleChange(e)}
                  data={formData}
              />}
              {pageNum === 2 && <FormVoyagePage2
                handleSubmit={(e) => handleSubmit(e)}
                handleChange={(e) => handleChange(e)}
                data={formData}
              />}

              <p>
                <a href="/reports" className="govuk-link govuk-link--no-visited-state" onClick={(e) => clearFormData(e)}>Exit without saving</a>
              </p>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FormVoyage;
