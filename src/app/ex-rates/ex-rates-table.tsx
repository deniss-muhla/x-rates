import React, { FunctionComponent, PropsWithChildren } from 'react';
import { ExRates } from '../../api/ex-rates/types';
import withApiStatus from '../components/api-status';
import {
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Typography,
    PropTypes,
    Paper
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles';

type ExRatesTableProps = {
    data?: ExRates;
};

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        overflow: 'auto'
    } as CSSProperties,
    list: {
        backgroundColor: theme.palette.background.paper
    } as CSSProperties,
    listItem: {
        '&:nth-child(odd):not(:hover)': {
            backgroundColor: fade(theme.palette.background.default, 0.5)
        } as CSSProperties
    }
}));

type ItemTextProps = {
    align?: PropTypes.Alignment;
    'data-test': string;
};
const ItemText: FunctionComponent<PropsWithChildren<ItemTextProps>> = ({
    children,
    ...otherProps
}) => {
    return (
        <ListItemText disableTypography>
            <Typography color={'textPrimary'} {...otherProps}>
                {children}
            </Typography>
        </ListItemText>
    );
};

const ExRatesTable: FunctionComponent<ExRatesTableProps> = ({ data }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root} data-test={ExRatesTable.displayName}>
            {data && data.rates ? (
                <List className={classes.list}>
                    {Object.keys(data.rates).map(key => {
                        return (
                            <ListItem
                                key={key}
                                data-test={`row-${key}`}
                                className={classes.listItem}
                                button
                            >
                                <ItemText data-test={'curr'}>{key}</ItemText>
                                <ItemText data-test={'rate'} align={'right'}>
                                    {data.rates[key]}
                                </ItemText>
                            </ListItem>
                        );
                    })}
                </List>
            ) : null}
        </Paper>
    );
};

ExRatesTable.displayName = 'ExRatesTable';

// use API status component HOC
export default withApiStatus(ExRatesTable);
