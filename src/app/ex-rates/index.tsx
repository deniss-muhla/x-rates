import React, { FunctionComponent, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { exRatesSelectors, exRatesActions } from '../../api/ex-rates';
import ExRatesTable from './ex-rates-table';
import './ex-rates.css';
import { Container, makeStyles } from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';
import GetRatesButton from './get-rates-button';
import { fade } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    '@global': {
        '#root': {
            display: 'flex',
            flex: '1',
            backgroundColor: theme.palette.background.default
        } as CSSProperties,
        '*::-webkit-scrollbar': {
            width: theme.spacing(1)
        } as CSSProperties,
        '*::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        } as CSSProperties,
        '*::-webkit-scrollbar-thumb': {
            backgroundColor: fade(theme.palette.text.primary, 0.2),
            outline: '1px solid slategrey'
        } as CSSProperties
    },
    root: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'auto'
        //maxHeight: '100%'
    } as CSSProperties
}));

const ExRates: FunctionComponent = () => {
    const classes = useStyles();

    const exRates = useSelector(exRatesSelectors.GetExRatesState);
    const dispatch = useDispatch();
    const getRates = useCallback(
        () => dispatch(exRatesActions.GetExRatesRequest()),
        [dispatch]
    );
    const isEmptyRates = !exRates.latestRates;

    return (
        <>
            <GetRatesButton isEmptyRates={isEmptyRates} onClick={getRates} />
            <Container
                data-test={ExRates.displayName}
                className={classes.root}
                maxWidth={'sm'}
            >
                <ExRatesTable
                    isPending={exRates.isPending}
                    error={exRates.error}
                    data={exRates.latestRates}
                />
            </Container>
        </>
    );
};

ExRates.displayName = 'ExRates';

export default ExRates;
