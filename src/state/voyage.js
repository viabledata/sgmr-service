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

const getDepartureInfo = (payload) => {
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

  return dataToSubmit;
};

const getArrivalInfo = (payload) => {
  let dataToSubmit = { arrivalPort: payload.arrivalPort, arrivalLat: payload.arrivalLat, arrivalLong: payload.arrivalLong };
  const shouldFormatDate = payload.arrivalDateYear && payload.arrivalDateMonth && payload.arrivalDateDay;
  const shouldFormatTime = payload.arrivalTimeHour && payload.arrivalTimeMinute;

  if (shouldFormatDate) {
    const arrivalDate = formatDate(payload.arrivalDateYear, payload.arrivalDateMonth, payload.arrivalDateDay);

    dataToSubmit = { ...dataToSubmit, status: 'Draft', arrivalDate };
  }

  if (shouldFormatTime) {
    const arrivalTime = `${payload.arrivalTimeHour}:${payload.arrivalTimeMinute}`;

    dataToSubmit = { ...dataToSubmit, arrivalTime };
  }

  return dataToSubmit;
};

const getVesselInfo = ({
  vesselName,
  vesselType,
  moorings,
  registration,
  callsign,
  hullIdentificationNumber,
  vesselNationality,
  vesselBase,
}) => ({
  status: 'Draft',
  vesselName,
  vesselType,
  moorings,
  registration,
  callsign,
  hullIdentificationNumber,
  vesselNationality,
  vesselBase,
});

const getPeopleInfo = ({ people }, peopleList) => {
  const peopleInfo = {
    status: 'Draft',
    people: peopleList
      .filter((person) => people.find((chosenPerson) => person.id === chosenPerson))
      .map((person) => {
        const preparedPerson = {
          ...person,
          peopleType: person.peopleType.name,
        };

        delete preparedPerson.id;

        return preparedPerson;
      }),
  };

  return peopleInfo;
};

const getVesselsInfo = ({ vessels }, vesselsList) => {
  const [chosenVessel] = vesselsList.filter((vessel) => vessel.id === vessels);

  return getVesselInfo(chosenVessel);
};

const updateVoyageReportRequest = async (payload, voyageId, peopleList, vesselsList) => {
  let dataToSubmit = {};

  switch (payload.formStep) {
    case 'departure':
      dataToSubmit = getDepartureInfo(payload);
      break;
    case 'arrival':
      dataToSubmit = getArrivalInfo(payload);
      break;
    case 'vessel':
      if (payload.vessels) {
        dataToSubmit = getVesselsInfo(payload, vesselsList);
      } else {
        dataToSubmit = getVesselInfo(payload);
      }
      break;
    case 'people':
      dataToSubmit = getPeopleInfo(payload, peopleList);
      break;
    default: break;
  }
  Object.keys(dataToSubmit).forEach((key) => (dataToSubmit[key] === null) && delete dataToSubmit[key]);

  const data = await axios.patch(`${VOYAGE_REPORT_URL}/${voyageId}`, dataToSubmit, {
    headers: { Authorization: `Bearer ${Auth.retrieveToken()}` },
  });

  return data;
};

export function* updateVoyageReport({ payload }) {
  try {
    const voyageId = yield select(({ voyage }) => voyage.id);
    const peopleList = yield select(({ people }) => people.list);
    const vesselsList = yield select(({ vessels }) => vessels.list);

    const { data } = yield call(updateVoyageReportRequest, payload, voyageId, peopleList, vesselsList);

    yield put(updateVoyageReportRoutine.success(data));
  } catch (error) {
    yield put(updateVoyageReportRoutine.failure(error));
  }
}

export function* watchVoyage() {
  yield takeLatest(createVoyageReportRoutine.REQUEST, createVoyageReport);
  yield takeLatest(updateVoyageReportRoutine.REQUEST, updateVoyageReport);
}
