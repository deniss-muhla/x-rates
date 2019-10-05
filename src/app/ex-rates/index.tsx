import React, { FunctionComponent } from 'react';

const ExRates: FunctionComponent = () => {
    return (
        <div data-test={ExRates.displayName}>
            <button data-test={'GetRates-button'}>Get Exchange Rates</button>
        </div>
    );
};

ExRates.displayName = 'ExRates';

export default ExRates;
