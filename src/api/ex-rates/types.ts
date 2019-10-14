import { PayloadAction, Action } from '../../types';

// action types
export enum ExRatesActionTypes {
    GET_EX_RATES_REQUEST = 'GET_EX_RATES_REQUEST',
    GET_EX_RATES_WITH_BASE_REQUEST = 'GET_EX_RATES_WITH_BASE_REQUEST',
    GET_EX_RATES_SUCCESS = 'GET_EX_RATES_SUCCESS',
    GET_EX_RATES_ERROR = 'GET_EX_RATES_ERROR'
}

// get latest rates request action type
export type GetExRatesRequestAction = Action<
    ExRatesActionTypes.GET_EX_RATES_REQUEST
>;
export type GetExRatesWithBaseRequestAction = PayloadAction<
    ExRatesActionTypes.GET_EX_RATES_WITH_BASE_REQUEST,
    string
>;

// get latest rates success response action type
export type GetExRatesSuccessAction = PayloadAction<
    ExRatesActionTypes.GET_EX_RATES_SUCCESS,
    ExRates
>;

// get latest rates error response action type
export type GetExRatesErrorAction = PayloadAction<
    ExRatesActionTypes.GET_EX_RATES_ERROR,
    string
>;

// all ExRates action types
export type ExRatesActions =
    | GetExRatesRequestAction
    | GetExRatesWithBaseRequestAction
    | GetExRatesSuccessAction
    | GetExRatesErrorAction;

// get rates response type
export type ExRates = {
    rates: {
        [key: string]: number;
    };
    base: string;
    date: string;
};

// ExRates state type
export type ExRatesState = {
    isPending: boolean;
    error?: string;
    latestRates?: ExRates;
};
