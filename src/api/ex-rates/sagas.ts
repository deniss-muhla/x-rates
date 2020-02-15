import {
    ExRatesActionTypes,
    ExRates,
    GetExRatesWithBaseRequestAction,
    GetPrevExRatesRequestAction,
    ExRatesState
} from './types';
import {
    actionChannel,
    takeEvery,
    all,
    fork,
    put,
    select
} from '@redux-saga/core/effects';
import axios, { AxiosResponse } from 'axios';
import { GetExRatesError, GetExRatesSuccess } from './actions';
import { RootState } from '../../types';
import { GetExRatesState } from './selectors';
import moment from 'moment';

// API url
const API_URL = 'https://api.exchangeratesapi.io';
const GET_LATEST_RATES_URL = `${API_URL}/latest`;
const GET_LATEST_RATES_WITH_BASE_URL = (base: string) =>
    `${API_URL}/latest?base=${base}`;
//https://api.exchangeratesapi.io/2010-01-12
const GET_PREV_RATES_URL = (date: string) => `${API_URL}/${date}`;

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
function* GetExRatesRequest() {
    try {
        // create ExRates request actions channel
        const channel = yield actionChannel(
            ExRatesActionTypes.GET_EX_RATES_REQUEST
        );

        // process all requests
        yield takeEvery(channel, GetExRatesRequestHandler);
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

// fetch latest rates with base
function* GetPrevExRatesWithBaseRequestHandler(
    action: GetPrevExRatesRequestAction
) {
    try {
        const latest = (yield select(GetExRatesState)) as ExRatesState;

        if (latest.latestRates) {
            console.log(latest.latestRates);

            const latestDate = moment(latest.latestRates.date, 'YYYY-MM-DD')
                .subtract('days', 1)
                .format('YYYY-MM-DD');

            // fetch data
            const response: AxiosResponse<ExRates> = yield axios.get(
                GET_PREV_RATES_URL(latestDate)
            );

            // send response to reducer
            yield put(GetExRatesSuccess(response.data));
        } else {
            yield put(GetExRatesError('Failed to get prev rates'));
        }
    } catch (e) {
        console.error(e);

        // send error to reducer
        yield put(GetExRatesError('Failed to get prev rates'));
    }
}

// get ExRates request action with base watcher
function* GetExRatesWithBaseRequest() {
    try {
        // create ExRates request actions channel
        const channel = yield actionChannel(
            ExRatesActionTypes.GET_EX_RATES_WITH_BASE_REQUEST
        );

        // process all requests
        yield takeEvery(channel, GetExRatesWithBaseRequestHandler);
    } catch (e) {
        console.error(e);
    }
}

// get prev ExRates request action with base watcher
function* GetPrevExRatesWithBaseRequest() {
    try {
        // create ExRates request actions channel
        const channel = yield actionChannel(
            ExRatesActionTypes.GET_PREV_EX_RATES_REQUEST
        );

        // process all requests
        yield takeEvery(channel, GetPrevExRatesWithBaseRequestHandler);
    } catch (e) {
        console.error(e);
    }
}

// root saga
export default function*() {
    yield all([
        fork(GetExRatesRequest),
        fork(GetExRatesWithBaseRequest),
        fork(GetPrevExRatesWithBaseRequest)
    ]);
}
