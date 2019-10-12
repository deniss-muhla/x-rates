import { exRatesSaga } from './ex-rates';
import { fork, all } from '@redux-saga/core/effects';

// root saga
export default function*() {
    yield all([fork(exRatesSaga)]);
}
