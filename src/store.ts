import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { apiReducer } from './api';

const rootReducer = combineReducers({ api: apiReducer });

export default createStore(rootReducer);
