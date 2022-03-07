import axios from 'axios';

// App imports
import Auth from '../lib/Auth';

const postData = async (url, dataToSubmit, pageSource) => {
  const source = pageSource || location.pathname.substring(1);
  const data = await axios.post(url, dataToSubmit, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  })
    .then((resp) => { return resp; })
    .catch((err) => {
      switch (err.response?.status) {
        case 401:
        case 422:
        case 405: window.location.assign(`/sign-in?source=${source}`); break;
        case 400: return ({
          errors: true, status: err.response.status, message: err.response.data.message, id: 'pageError',
        });
        default: return ({
          errors: true, status: 500, message: 'There has been a problem please try again later or view the help page', id: 'helpError',
        });
      }
    });
  return data;
};

const getData = (url, pageSource) => {
  const source = pageSource || location.pathname.substring(1);
  const data = axios.get(url, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  })
    .then((resp) => { return resp; })
    .catch((err) => {
      if (err.response) {
        switch (err.response.status) {
          case 401:
          case 422:
          case 405: window.location.assign(`/sign-in?source=${source}`); break;
          default: return ({ errors: true, status: err.response.status, message: err.response.data.message });
        }
      }
    });
  return data;
};

const patchData = (url, dataToSubmit, pageSource) => {
  const source = pageSource || location.pathname.substring(1);
  const data = axios.patch(url, dataToSubmit, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  })
    .then((resp) => { return resp; })
    .catch((err) => {
      if (err.response) {
        switch (err.response.status) {
          case 401:
          case 422:
          case 405: window.location.assign(`/sign-in?source=${source}`); break;
          default: return ({ errors: true, status: err.response.status, message: err.response.data.message });
        }
      }
    });
  return data;
};

const deleteItem = (url, pageSource) => {
  const source = pageSource || location.pathname.substring(1);
  const data = axios.delete(url, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  })
    .then((resp) => { return resp; })
    .catch((err) => {
      if (err.response) {
        switch (err.response.status) {
          case 401:
          case 422:
          case 405: window.location.assign(`/sign-in?source=${source}`); break;
          default: return ({ errors: true, status: err.response.status, message: err.response.data.message });
        }
      }
    });
  return data;
};

const deleteData = async (url) => {
  const response = await axios.delete(url, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  });
  return response.data;
};

export {
  postData,
  getData,
  patchData,
  deleteItem,
  deleteData,
};
