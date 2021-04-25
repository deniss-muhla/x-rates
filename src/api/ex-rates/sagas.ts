import {
    ExRatesActionTypes,
    ExRates,
    GetExRatesWithBaseRequestAction
} from './types';
import {
    actionChannel,
    takeEvery,
    all,
    fork,
    put,
    ActionChannelEffect,
    ForkEffect
} from '@redux-saga/core/effects';
import axios, { AxiosResponse } from 'axios';
import { GetExRatesError, GetExRatesSuccess } from './actions';
import { TakeableChannel } from 'redux-saga';

// API url
const API_KEY = 'access_key=a8b71aad5cf418d0c91ed5475c5fda39';
const API_URL = 'http://api.exchangeratesapi.io/v1';
const GET_LATEST_RATES_URL = `${API_URL}/latest?${API_KEY}`;
const GET_LATEST_RATES_WITH_BASE_URL = (base: string) =>
    `${API_URL}/latest?${API_KEY}&base=${base}`;

// fetch latest rates
function* GetExRatesRequestHandler() {
    try {
        // fetch data
        const response: AxiosResponse<ExRates> = yield axios.get(
            GET_LATEST_RATES_URL
        );

        // send response to reducer
        yield put(GetExRatesSuccess(response.data));
    } catch (e) {
        console.error(e);

        // send error to reducer
        yield put(GetExRatesError('Failed to get latest rates'));
    }
}

// get ExRates request action watcher
function* GetExRatesRequest(): Generator<
    ActionChannelEffect | ForkEffect<never>
> {
    try {
        // create ExRates request actions channel
        const channel = yield actionChannel(
            ExRatesActionTypes.GET_EX_RATES_REQUEST
        );

        // process all requests
        yield takeEvery(
            channel as TakeableChannel<unknown>,
            GetExRatesRequestHandler
        );
    } catch (e) {
        console.error(e);
    }
}

// fetch latest rates with base
function* GetExRatesWithBaseRequestHandler(
    action: GetExRatesWithBaseRequestAction
) {
    try {
        // fetch data
        const response: AxiosResponse<ExRates> = yield axios.get(
            GET_LATEST_RATES_WITH_BASE_URL(action.payload)
        );

        // send response to reducer
        yield put(GetExRatesSuccess(response.data));
    } catch (e) {
        console.error(e);

        // send error to reducer
        yield put(GetExRatesError('Failed to get latest rates'));
    }
}

// get ExRates request action with base watcher
function* GetExRatesWithBaseRequest(): Generator<
    ActionChannelEffect | ForkEffect<never>
> {
    try {
        // create ExRates request actions channel
        const channel = yield actionChannel(
            ExRatesActionTypes.GET_EX_RATES_WITH_BASE_REQUEST
        );

        // process all requests
        yield takeEvery(
            channel as TakeableChannel<unknown>,
            GetExRatesWithBaseRequestHandler
        );
    } catch (e) {
        console.error(e);
    }
}

// root saga
export default function* () {
    yield all([fork(GetExRatesRequest), fork(GetExRatesWithBaseRequest)]);
}
