import { combineReducers, ReducersMapObject } from 'redux';
import { exRatesReducer } from './ex-rates';
import { ApiState } from './types';

const apiReducer: ReducersMapObject<ApiState> = { exRates: exRatesReducer };

export default combineReducers(apiReducer);
