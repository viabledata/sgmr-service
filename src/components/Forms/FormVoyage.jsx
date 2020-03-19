import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

// app imports
import FormVoyageArrival from 'FormVoyageArrival';
import FormVoyageCheckDetails from 'FormVoyageCheckDetails';
import FormVoyageDeparture from 'FormVoyageDeparture';
import FormVoyagePeople from 'FormVoyagePeople';
import FormVoyageSubmitted from 'FormVoyageSubmitted';
import FormVoyageVessel from 'FormVoyageVessel';

const FormVoyage = () => {
  const location = useLocation();
  const history = useHistory();
  const maxPages = 5;
  let [pageNum, setPageNum] = useState();
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || [{}]);
  // const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { title: null });

  // // Handle errors
  // const removeError = (fieldName) => {
  //   const tempArr = { ...errors };
  //   const key = fieldName;
  //   delete tempArr[key];
  //   setErrors(tempArr);
  // };

  // const handleErrors = (e, errorText, groupField) => {
  //   // For fields with multiple inputs in a single group
  //   const name = !groupField ? e.target.name : groupField;
  //   // Error onBlur if field is blank
  //   if (!e.target.value) { setErrors({ ...errors, [name]: errorText }); }
  //   // Error onBlur if condition not met
  //   switch (e.target.name) {
  //     case 'email': (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) ? removeError('email') : setErrors({ ...errors, email: errorText }); break;
  //     case 'confirmEmail': formData.email.toLowerCase() === formData.confirmEmail.toLowerCase() ? removeError('confirmEmail') : setErrors({ ...errors, confirmEmail: errorText }); break;
  //     case 'confirmPassword': formData.password === formData.confirmPassword ? removeError('confirmPassword') : setErrors({ ...errors, confirmPassword: errorText }); break;
  //     default: null;
  //   }
  // };

  // Update form info to state
  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    switch (type) {
      case 'checkbox': {
        formData[name] = [...formData[name] || [], value]; // Create array, add current values and new value

        if (!checked) {
          formData[name] = formData[name].filter((formDataValue) => formDataValue !== value); // Remove the current value if it is not checked
        }

        setFormData({ ...formData });
        break;
      }
      default: setFormData({ ...formData, [name]: value }); break;
    }

    // removeError(e.target.name);
  };

  const clearFormData = (e) => {
    setFormData({});
    // setErrors({ title: null });
  };

  const setNextPage = () => {
    const nextPage = pageNum < maxPages + 1 ? pageNum + 1 : pageNum;
    setPageNum(nextPage);
    history.push(`/save-voyage/page-${nextPage}`);
  };

  const handleSubmit = (e) => {
    // Combine date fields into required format before submit
    e.preventDefault();
    setNextPage();
  };

  // Update localStorage to hold page data
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  // useEffect(() => {
  //   localStorage.setItem('errors', JSON.stringify(errors));
  // }, [errors]);

  // Set page number based on current URL
  useEffect(() => {
    const thisPage = location.pathname.split('page-');
    setPageNum(parseInt(thisPage[1], 10));
  }, [location]);

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
              {pageNum === 4 && <FormVoyagePeople
                handleSubmit={(e) => handleSubmit(e)}
                handleChange={(e) => handleChange(e)}
                data={formData}
              />}
              {pageNum === 5 && <FormVoyageCheckDetails
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
