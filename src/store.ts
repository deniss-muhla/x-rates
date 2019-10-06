import { createStore, applyMiddleware, ReducersMapObject } from 'redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { apiReducer } from './api';
import { RootState } from './types';

// create root reducer
const rootReducer: ReducersMapObject<RootState> = { api: apiReducer };

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

// compose with redux devtools
const composeEnhancers = composeWithDevTools({});

// create redux store
const store = createStore(
    combineReducers(rootReducer),
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

// then run root saga
//sagaMiddleware.run(mySaga)

export default store;
