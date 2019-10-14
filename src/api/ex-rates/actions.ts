import {
    GetExRatesRequestAction,
    ExRatesActionTypes,
    GetExRatesSuccessAction,
    ExRates,
    GetExRatesErrorAction,
    GetExRatesWithBaseRequestAction
} from './types';

// get latest rates request action
export const GetExRatesRequest = (): GetExRatesRequestAction => ({
    type: ExRatesActionTypes.GET_EX_RATES_REQUEST
});

// get latest rates with base request action
export const GetExRatesWithBaseRequest = (
    base: string
): GetExRatesWithBaseRequestAction => ({
    type: ExRatesActionTypes.GET_EX_RATES_WITH_BASE_REQUEST,
    payload: base
});

// get latest rates success response action
export const GetExRatesSuccess = (
    exRates: ExRates
): GetExRatesSuccessAction => ({
    type: ExRatesActionTypes.GET_EX_RATES_SUCCESS,
    payload: exRates
});

// get latest rates error response action
export const GetExRatesError = (error: string): GetExRatesErrorAction => ({
    type: ExRatesActionTypes.GET_EX_RATES_ERROR,
    payload: error
});
