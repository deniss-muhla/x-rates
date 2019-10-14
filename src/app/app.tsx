import React from 'react';
import { FunctionComponent } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import ExRates from './ex-rates';
import theme from './theme';
import {
    makeStyles,
    AppBar,
    Typography,
    Toolbar,
    Container
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';

const useStyles = makeStyles({
    '@global': {
        body: {
            display: 'flex',
            minHeight: '100vh',
            maxHeight: '100vh',
            overflow: 'hidden'
        } as CSSProperties,
        '#root': {
            display: 'flex',
            flex: '1'
        } as CSSProperties
    },
    root: {
        display: 'flex',
        flexDirection: 'column'
        //        maxHeight: '100%',
    } as CSSProperties,
    appBar: {
        minHeight: 56
    } as CSSProperties
});

const App: FunctionComponent = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Container className={classes.root}>
                <AppBar position={'static'}>
                    <Toolbar className={classes.appBar}>
                        <Typography variant={'h6'}>{'X-Rates'}</Typography>
                    </Toolbar>
                </AppBar>
                <ExRates />
            </Container>
        </ThemeProvider>
    );
};

App.displayName = 'App';

export default App;
