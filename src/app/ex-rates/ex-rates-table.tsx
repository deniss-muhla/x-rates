import React, { FunctionComponent } from 'react';
import { ExRates } from '../../api/ex-rates/types';
import withApiStatus from '../components/api-status';

type ExRatesTableProps = {
    data?: ExRates;
};

const ExRatesTable: FunctionComponent<ExRatesTableProps> = ({ data }) => {
    return (
        <div data-test={ExRatesTable.displayName}>
            {data && data.rates ? (
                <table>
                    <thead>
                        <tr>
                            <th>{'currency'}</th>
                            <th>{'rate'}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(data.rates).map(key => {
                            return (
                                <tr key={key} data-test={`row-${key}`}>
                                    <td data-test={'curr'}>{key}</td>
                                    <td data-test={'rate'}>
                                        {data.rates[key]}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <span data-test={'no-data'}>{'No data'}</span>
            )}
        </div>
    );
};

ExRatesTable.displayName = 'ExRatesTable';

// use API status component HOC
export default withApiStatus(ExRatesTable);
