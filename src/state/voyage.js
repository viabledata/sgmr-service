import axios from 'axios';
import {
  call, put, takeLatest, select,
} from 'redux-saga/effects';
import { createRoutine } from 'redux-saga-routines';

import Auth from 'Auth';
import { USER_VOYAGE_REPORT_URL, VOYAGE_REPORT_URL } from 'Constants/ApiConstants';
import { formatDate } from 'Utils/date';

export const createVoyageReportRoutine = createRoutine('CREATE_VOYAGE_REPORT');
export const updateVoyageReportRoutine = createRoutine('UPDATE_VOYAGE_REPORT');

export const initialState = Object.freeze({
  isLoading: false,
  hasLoaded: false,
  voyage: {},
  error: null,
  id: null,
  status: {},
});

export const voyageReducer = (state = initialState, action) => {
  switch (action.type) {
    case createVoyageReportRoutine.REQUEST:
      return { ...state, isLoading: true, hasLoaded: false };
    case createVoyageReportRoutine.SUCCESS:
      return {
        ...state, hasLoaded: true, isLoading: false, id: action.payload.id, status: action.payload.status,
      };
    case createVoyageReportRoutine.FAILURE:
      return {
        ...state, isLoading: false, hasLoaded: false, error: action.payload,
      };
    default: {
      return state;
    }
  }
};

const createVoyageReportRequest = async () => {
  const data = await axios.post(USER_VOYAGE_REPORT_URL, {}, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  });

  return data;
};

export function* createVoyageReport() {
  try {
    const { data } = yield call(createVoyageReportRequest);

    yield put(createVoyageReportRoutine.success(data));
  } catch (error) {
    yield put(createVoyageReportRoutine.failure(error));
  }
}

const updateVoyageReportRequest = async (payload, voyageId) => {
  let dataToSubmit = { departurePort: payload.departurePort, departureLat: payload.departureLat, departureLong: payload.departureLong };
  const shouldFormatDate = payload.departureDateYear && payload.departureDateMonth && payload.departureDateDay;
  const shouldFormatTime = payload.departureTimeHour && payload.departureTimeMinute;

  if (shouldFormatDate) {
    const departureDate = formatDate(payload.departureDateYear, payload.departureDateMonth, payload.departureDateDay);

    dataToSubmit = { ...dataToSubmit, status: 'Draft', departureDate };
  }

  if (shouldFormatTime) {
    const departureTime = `${payload.departureTimeHour}:${payload.departureTimeMinute}`;

    dataToSubmit = { ...dataToSubmit, departureTime };
  }

  const data = await axios.patch(`${VOYAGE_REPORT_URL}/${voyageId}`, dataToSubmit, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  });

  return data;
};

export function* updateVoyageReport({ payload }) {
  try {
    const voyageId = yield select(({ voyage }) => voyage.id);

    const { data } = yield call(updateVoyageReportRequest, payload, voyageId);

    yield put(updateVoyageReportRoutine.success(data));
  } catch (error) {
    yield put(updateVoyageReportRoutine.failure(error));
  }
}

export function* watchVoyage() {
  yield takeLatest(createVoyageReportRoutine.REQUEST, createVoyageReport);
  yield takeLatest(updateVoyageReportRoutine.REQUEST, updateVoyageReport);
}
