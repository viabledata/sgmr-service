import { all, fork } from 'redux-saga/effects';
import {
  createStore, applyMiddleware, compose, combineReducers,
} from 'redux';
import createSagaMiddleware from 'redux-saga';

import { peopleReducer, watchPeople } from './people';
import { voyageReducer, watchVoyage } from './voyage';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const watchSagas = [watchPeople, watchVoyage];

function* rootSaga() {
  yield all(watchSagas.map(fork));
}

const reducers = {
  people: peopleReducer,
  voyage: voyageReducer,
};

const combinedReducers = combineReducers(reducers);

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeEnhancers(...enhancers);
  const store = createStore(combinedReducers, composedEnhancers);

  sagaMiddleware.run(rootSaga);

  return store;
};

export default configureStore;
