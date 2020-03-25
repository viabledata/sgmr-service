import { all, fork } from 'redux-saga/effects';
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import { createBrowserHistory } from 'history';
import persistState from 'redux-localstorage';
import createSagaMiddleware from 'redux-saga';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import { peopleReducer, watchPeople } from './people';
import { vesselsReducer, watchVessels } from './vessels';
import { voyageReducer, watchVoyage } from './voyage';
import { reportsReducer, watchReports } from './reports';

export const history = createBrowserHistory();

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
  router: connectRouter(history),
};

const combinedReducers = combineReducers(reducers);

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer, persistState()];
  const composedEnhancers = composeEnhancers(...enhancers);
  const store = createStore(combinedReducers, composedEnhancers);

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
