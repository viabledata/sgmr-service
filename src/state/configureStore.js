import { all, fork } from 'redux-saga/effects';
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import persistState from 'redux-localstorage';
import createSagaMiddleware from 'redux-saga';

import { peopleReducer, watchPeople } from './people';
import { vesselsReducer, watchVessels } from './vessels';
import { voyageReducer, watchVoyage } from './voyage';
import { reportsReducer, watchReports } from './reports';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const watchSagas = [watchPeople, watchVessels, watchVoyage, watchReports];

function* rootSaga() {
  yield all(watchSagas.map(fork));
}

const reducers = {
  people: peopleReducer,
  voyage: voyageReducer,
  vessels: vesselsReducer,
  reports: reportsReducer,
};

const combinedReducers = combineReducers(reducers);

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, persistState()];
  const composedEnhancers = composeEnhancers(...enhancers);
  const store = createStore(combinedReducers, composedEnhancers);

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
