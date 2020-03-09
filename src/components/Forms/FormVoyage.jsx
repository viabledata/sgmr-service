import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// NOTE: form does not handle errors for now, can replicate what is done on Voyage when needed

// app imports
import FormVoyageDeparture from 'FormVoyageDeparture';
import FormVoyageArrival from 'FormVoyageArrival';
import FormVoyageVessel from 'FormVoyageVessel'

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
    // Note, if page isn't the last page don't clear localstorage on commit, as user should be able to go back and forth without needing a GET
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
    <div id="pageContainer" className="govuk-width-container ">
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
            <form>

              {pageNum === 1 && <FormVoyageDeparture
                  handleSubmit={(e) => handleSubmit(e)}
                  handleChange={(e) => handleChange(e)}
                  data={formData}
              />}
              {pageNum === 2 && <FormVoyageArrival
                handleSubmit={(e) => handleSubmit(e)}
                handleChange={(e) => handleChange(e)}
                data={formData}
              />}
              {pageNum === 3 && <FormVoyageVessel
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
