import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/app';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './store';

// render application
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// register service worker
serviceWorker.register();
