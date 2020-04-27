import React from 'react';

// app imports
import FormPerson from '@components/People/FormPerson';

const CreatePersonForVoyage = (handleSubmit, handleChange, clearLocalStorage, formData, errors) => {
  return (

    <FormPerson
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      clearLocalStorage={clearLocalStorage}
      data={formData || ''}
      formData={formData || ''}
      errors={errors || ''}
    />

  );
};

export default CreatePersonForVoyage;
