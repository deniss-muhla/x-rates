import React, { FunctionComponent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { exRatesSelectors, exRatesActions } from '../../api/ex-rates';
import ExRatesTable from './ex-rates-table';
import './ex-rates.css';

const ExRates: FunctionComponent = () => {
    const exRates = useSelector(exRatesSelectors.GetExRatesState);
    const dispatch = useDispatch();
    const getRates = useCallback(
        () => dispatch(exRatesActions.GetExRatesRequest()),
        [dispatch]
    );

    return (
        <div data-test={ExRates.displayName} className={'ex-rates-container'}>
            <button data-test={'GetRates-button'} onClick={getRates}>
                {'Get Exchange Rates for EUR base'}
            </button>
            <ExRatesTable
                isPending={exRates.isPending}
                error={exRates.error}
                data={exRates.latestRates}
            />
        </div>
    );
};

ExRates.displayName = 'ExRates';

export default ExRates;
