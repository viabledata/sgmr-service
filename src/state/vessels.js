import axios from 'axios';
import {
  call, put, takeLatest,
} from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { createRoutine } from 'redux-saga-routines';

import Auth from 'Auth';
import { VESSELS_URL } from 'Constants/ApiConstants';

export const fetchVesselsRoutine = createRoutine('FETCH_VESSELS');

export const initialState = Object.freeze({
  isLoading: false,
  hasLoaded: false,
  list: [],
  error: null,
});

export const vesselsReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchVesselsRoutine.TRIGGER:
      return { ...state, isLoading: true, hasLoaded: false };
    case fetchVesselsRoutine.SUCCESS:
      return {
        ...state, hasLoaded: true, isLoading: false, list: action.payload.vessels, id: action.payload.id,
      };
    case fetchVesselsRoutine.FAILURE:
      return {
        ...state, isLoading: false, hasLoaded: false, error: action.payload,
      };
    default: {
      return state;
    }
  }
};

const fetchVesselsRequest = async () => {
  const data = await axios.get(`${VESSELS_URL}?pagination=false`, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  });

  return data;
};

function* redirectToSignIn({ response }) {
  if (response) {
    switch (response.status) {
      case 401:
      case 422:
      case 405:
        yield put(push(`/sign-in?source=${window.location.pathname}`));
        break;
      default: break;
    }
  }
}

export function* fetchVessels() {
  try {
    const { data } = yield call(fetchVesselsRequest);

    yield put(fetchVesselsRoutine.success(data));
  } catch (error) {
    yield put(fetchVesselsRoutine.failure(error));
    yield call(redirectToSignIn, error);
  }
}

export function* watchVessels() {
  yield takeLatest(fetchVesselsRoutine.TRIGGER, fetchVessels);
}
