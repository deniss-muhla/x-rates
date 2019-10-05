import { Action, PayloadAction } from '../../types';

export enum IExRatesActionTypes {
    GET_EX_RATES_LATEST_REQUEST = 'GET_EX_RATES_LATEST',
    GET_EX_RATES_LATEST_SUCCESS = 'GET_EX_RATES_LATEST_SUCCESS',
    GET_EX_RATES_LATEST_ERROR = 'GET_EX_RATES_LATEST_ERROR'
}
export type IGetExRatesLatestRequestAction = Action<
    IExRatesActionTypes.GET_EX_RATES_LATEST_REQUEST
>;
export type IGetExRatesLatestSuccessAction = PayloadAction<
    IExRatesActionTypes.GET_EX_RATES_LATEST_SUCCESS,
    ExRates
>;
export type IGetExRatesLatestErrorAction = PayloadAction<
    IExRatesActionTypes.GET_EX_RATES_LATEST_ERROR,
    string
>;

export type IExRatesActions =
    | IGetExRatesLatestRequestAction
    | IGetExRatesLatestSuccessAction
    | IGetExRatesLatestErrorAction;

export type ExRates = {
    rates: {
        [key: string]: number;
    };
    base: string;
    date: string;
};

export type IExRatesState = {
    isPending: boolean;
    error?: string;
    latest?: ExRates;
};
