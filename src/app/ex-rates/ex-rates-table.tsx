import React, { FunctionComponent } from 'react';
import { ExRates } from '../../api/ex-rates/types';
import withApiStatus from '../components/api-status';

type ExRatesTableProps = {
    data?: ExRates;
};

const ExRatesTable: FunctionComponent<ExRatesTableProps> = ({ data }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>{'currency'}</th>
                    <th>{'rate'}</th>
                </tr>
            </thead>
            <tbody>
                {data && data.rates ? (
                    Object.keys(data.rates).map(key => {
                        return (
                            <tr key={key}>
                                <td>{key}</td>
                                <td>{data.rates[key]}</td>
                            </tr>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan={2}>{'No data'}</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

// use API status component HOC
export default withApiStatus(ExRatesTable);
