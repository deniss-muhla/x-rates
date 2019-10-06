import {
    GetExRatesRequestAction,
    ExRatesActionTypes,
    GetExRatesSuccessAction,
    ExRates,
    GetExRatesErrorAction
} from './types';

// get latest rates request action type
export const GetExRatesRequest = (): GetExRatesRequestAction => ({
    type: ExRatesActionTypes.GET_EX_RATES_REQUEST
});

// get latest rates success response action type
export const GetExRatesSuccess = (
    exRates: ExRates
): GetExRatesSuccessAction => ({
    type: ExRatesActionTypes.GET_EX_RATES_SUCCESS,
    payload: exRates
});

// get latest rates error response action type
export const GetExRatesError = (error: string): GetExRatesErrorAction => ({
    type: ExRatesActionTypes.GET_EX_RATES_ERROR,
    payload: error
});
