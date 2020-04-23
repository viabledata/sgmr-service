import axios from 'axios';

// App imports
import Auth from '@lib/Auth';


const postData = (url, dataToSubmit, pageSource) => {
  const source = pageSource || location.pathname.substring(1);
  const data = axios.post(url, dataToSubmit, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  })
    .then((resp) => { return resp.data; })
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


const getData = (url, pageSource) => {
  const source = pageSource || location.pathname.substring(1);
  const data = axios.get(url, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  })
    .then((resp) => { return resp.data; })
    .catch((err) => {
      if (err.response) {
        switch (err.response.status) {
          case 401: history.push(`/sign-in?source=${source}`); break;
          case 422: history.push(`/sign-in?source=${source}`); break;
          case 405: history.push(`/sign-in?source=${source}`); break;
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
    .then((resp) => { return resp.data; })
    .catch((err) => {
      if (err.response) {
        switch (err.response.status) {
          case 401: history.push(`/sign-in?source=${source}`); break;
          case 422: history.push(`/sign-in?source=${source}`); break;
          case 405: history.push(`/sign-in?source=${source}`); break;
          default: return ({ errors: true, status: err.response.status, message: err.response.data.message });
        }
      }
    });
  return data;
};


export {
  postData,
  getData,
  patchData,
};
