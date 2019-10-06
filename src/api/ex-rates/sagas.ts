import { ExRatesActionTypes, ExRates } from './types';
import {
    actionChannel,
    takeEvery,
    all,
    fork,
    put
} from '@redux-saga/core/effects';
import axios, { AxiosResponse } from 'axios';
import { GetExRatesError, GetExRatesSuccess } from './actions';

// API url
const GET_LATEST_RATES_URL = `${process.env.REACT_APP_API_URL}/latest`;

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

// root saga
export default function*() {
    yield all([fork(GetExRatesRequest)]);
}
