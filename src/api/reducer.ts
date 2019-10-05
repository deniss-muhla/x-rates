import { combineReducers } from 'redux';
import { exRatesReducer } from './ex-rates';

export default combineReducers({ exRates: exRatesReducer });
