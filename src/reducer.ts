import { combineReducers, ReducersMapObject } from 'redux';
import { RootState } from './types';
import { apiReducer } from './api';

const rootReducer: ReducersMapObject<RootState> = { api: apiReducer };

export default combineReducers(rootReducer);
