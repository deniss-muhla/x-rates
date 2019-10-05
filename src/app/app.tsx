import React from 'react';
import { FunctionComponent } from 'react';
import ExRates from './ex-rates';
import './app.css';

const App: FunctionComponent = () => {
    return (
        <div className="app">
            <header className="app-header">
                <ExRates />
            </header>
        </div>
    );
};

App.displayName = 'App';

export default App;
