import axios from 'axios';
import {
  all, fork, call, put, takeLatest,
} from 'redux-saga/effects';
import { createRoutine } from 'redux-saga-routines';

import Auth from 'Auth';
import { apiUrl } from 'config';

export const fetchPeopleRoutine = createRoutine('FETCH_PEOPLE');

export const initialState = Object.freeze({
  isLoading: false,
  hasLoaded: false,
  list: [],
  error: null,
});

export const peopleReducer = (state = initialState, action) => {
  switch (action.type) {
    case fetchPeopleRoutine.TRIGGER:
      return { ...state, isLoading: true, hasLoaded: false };
    case fetchPeopleRoutine.SUCCESS:
      return {
        ...state, hasLoaded: true, isLoading: false, list: action.payload,
      };
    case fetchPeopleRoutine.FAILURE:
      return {
        ...state, isLoading: false, hasLoaded: false, error: action.payload,
      };
    default: {
      return state;
    }
  }
};

const fetchPeopleRequest = async () => {
  const data = await axios.get(`${apiUrl}/user/people`, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  });

  return data;
};

export function* fetchPeople() {
  try {
    yield put(fetchPeopleRoutine.request());
    const { data } = yield call(fetchPeopleRequest);

    yield put(fetchPeopleRoutine.success(data));
  } catch (error) {
    yield put(fetchPeopleRoutine.failure(error));
  }
}

export function* watchPeople() {
  yield takeLatest(fetchPeopleRoutine.TRIGGER, fetchPeople);
}

export default {
  peopleReducer,
  watchPeople,
};
