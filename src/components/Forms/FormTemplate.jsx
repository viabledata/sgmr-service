import React, { useState, useEffect } from 'react';

const FormTemplate = () => {
  const [formData, setFormData] = useState(JSON.parse(localStorage.getItem('formData')) || {});
  const [errors, setErrors] = useState(JSON.parse(localStorage.getItem('errors')) || { title: null });

  // ==== Update form info to state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //= === Handle errors [for empty fields]
  const removeError = (fieldName) => {
    const tempArr = { ...errors };
    const key = fieldName;
    delete tempArr[key];
    setErrors(tempArr);
  };
  const handleErrors = (e, errorText) => {
    // if field value is empty, add error : if field has value, removeError
    // eslint-disable-next-line no-unused-expressions
    !e.target.value ? setErrors({ ...errors, [e.target.name]: errorText }) : removeError(e.target.name);
  };

  // ==== Clear formData from localStorage
  // as localStorage updates whenever there is a change to the value of formData or errors, it clears the field data as part of the set function
  const clearFormData = (e) => {
    if (e) { e.preventDefault(); }
    setFormData({});
    setErrors({ title: null }); // using a default structure here for now -- need to look at if statement in remove error/setError cause they currently spread errors
  };

  //= === Handle Submit, including clearing localStorage
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFormData();
  };

  //= === Update localStorage to hold page data
  // this is done seperately to handle change as it needs to update when the formData value changes, not when the input field changes
  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('errors', JSON.stringify(errors));
  }, [errors]);

  return (
    <div>
 For now formtemplate isn't actively used, we are defining each form independentaly and copying this info over. Will revist later.
    </div>
  );
};

export default FormTemplate;
