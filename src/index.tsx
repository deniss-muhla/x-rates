import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { CssBaseline } from '@material-ui/core';

// render application
ReactDOM.render(
    <Provider store={store}>
        <CssBaseline />
        <App />
    </Provider>,
    document.getElementById('root')
);

// register service worker
serviceWorker.register();
