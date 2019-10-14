import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import rootReducer from './reducer';

// create saga middleware
const sagaMiddleware = createSagaMiddleware();

// compose with redux devtools
const composeEnhancers = composeWithDevTools({});

// create redux store
const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
);

// run root sagas
let rootSagaTask = sagaMiddleware.run(rootSaga);

// webpack hot module replacement
if (module.hot && process.env.NODE_ENV !== 'production') {
    // replace reducer
    module.hot.accept('./reducer', () => store.replaceReducer(rootReducer));
    // replace saga
    module.hot.accept('./sagas', () => {
        rootSagaTask.cancel();
        rootSagaTask.toPromise().then(() => {
            rootSagaTask = sagaMiddleware.run(rootSaga);
        });
    });
}

// expose store when run in Cypress
if (window.Cypress) {
    window.store = store;
}

export default store;
