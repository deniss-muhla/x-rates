import React, { FunctionComponent } from 'react';
import ReactDOM from 'react-dom';
import App from './app/app';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './store';
import { CssBaseline } from '@material-ui/core';

// render application
const render = (Component: FunctionComponent) => {
    return ReactDOM.render(
        <Provider store={store}>
            <CssBaseline />
            <Component />
        </Provider>,
        document.getElementById('root')
    );
};

render(App);

// webpack hot module replacement
if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('./app/app', () => {
        const NextApp = require('./app/app').default;
        render(NextApp);
    });
}

// register service worker
serviceWorker.register();
