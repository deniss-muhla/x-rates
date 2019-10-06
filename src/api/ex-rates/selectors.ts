import { RootState } from '../../types';
import { ExRatesState } from './types';

export const GetExRatesState = (state: RootState): ExRatesState =>
    state.api.exRates;
