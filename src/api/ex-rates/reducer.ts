import { IExRatesState, IExRatesActions, IExRatesActionTypes } from './types';
import { Reducer } from 'redux';

const initialState: IExRatesState = {
    isPending: false,
    error: undefined,
    latest: undefined
};

const exRatesReducer: Reducer<IExRatesState, IExRatesActions> = (
    prevState = initialState,
    action
) => {
    switch (action.type) {
        case IExRatesActionTypes.GET_EX_RATES_LATEST_REQUEST: {
            return {
                ...prevState,
                isPending: true,
                error: undefined
            };
        }
        case IExRatesActionTypes.GET_EX_RATES_LATEST_SUCCESS: {
            return {
                ...prevState,
                isPending: false,
                latest: action.payload
            };
        }
        case IExRatesActionTypes.GET_EX_RATES_LATEST_ERROR: {
            return {
                ...prevState,
                isPending: true,
                error: action.payload
            };
        }
        default: {
            return prevState;
        }
    }
};

export default exRatesReducer;
