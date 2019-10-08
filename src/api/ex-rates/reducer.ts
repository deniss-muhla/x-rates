import { ExRatesState, ExRatesActions, ExRatesActionTypes } from './types';
import { Reducer } from 'redux';

const initialState: ExRatesState = {
    isPending: false,
    error: undefined,
    latestRates: undefined
};

const exRatesReducer: Reducer<ExRatesState, ExRatesActions> = (
    prevState = initialState,
    action
) => {
    switch (action.type) {
        case ExRatesActionTypes.GET_EX_RATES_REQUEST: {
            return {
                ...prevState,
                isPending: true,
                error: undefined
            };
        }
        case ExRatesActionTypes.GET_EX_RATES_SUCCESS: {
            return {
                ...prevState,
                isPending: false,
                latestRates: action.payload,
                error: undefined
            };
        }
        case ExRatesActionTypes.GET_EX_RATES_ERROR: {
            return {
                ...prevState,
                isPending: false,
                error: action.payload
            };
        }
        default: {
            return prevState;
        }
    }
};

export default exRatesReducer;
