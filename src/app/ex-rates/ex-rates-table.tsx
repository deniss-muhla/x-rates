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
    Paper,
    ListItemIcon,
    IconButton
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';
import { fade } from '@material-ui/core/styles';
import RadioboxMarkedIcon from '../components/icons/radiobox-marked-icon';
import RadioboxBlankIcon from '../components/icons/radiobox-blank-icon';

type ExRatesTableProps = {
    data?: ExRates;
    onSelectBase: (base: string) => void;
};

const useStyles = makeStyles((theme) => ({
    root: {
        flex: 1,
        overflow: 'auto'
    } as CSSProperties,
    list: {
        backgroundColor: theme.palette.background.paper
    } as CSSProperties,
    listItem: {
        '&:nth-child(odd)': {
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

const ExRatesTable: FunctionComponent<ExRatesTableProps> = ({
    data,
    onSelectBase
}) => {
    const classes = useStyles();
    if (data && data.rates) {
        const itemKeys = Object.keys(data.rates);
        if (itemKeys.findIndex((v) => v === data.base) === -1) {
            itemKeys.unshift(data.base);
        }
        itemKeys.sort();

        return (
            <Paper
                className={classes.root}
                data-test={ExRatesTable.displayName}
            >
                <List className={classes.list}>
                    {itemKeys.map((key) => {
                        const isSelected = key === data.base;
                        return (
                            <ListItem
                                key={key}
                                data-test={`row-${key}`}
                                className={classes.listItem}
                            >
                                <ListItemIcon>
                                    {isSelected ? (
                                        <RadioboxMarkedIcon />
                                    ) : (
                                        <RadioboxBlankIcon />
                                    )}
                                </ListItemIcon>
                                <ItemText data-test={'curr'}>{key}</ItemText>
                                <ItemText data-test={'rate'} align={'right'}>
                                    {data.rates[key] || 1}
                                </ItemText>
                            </ListItem>
                        );
                    })}
                </List>
            </Paper>
        );
    } else {
        return (
            <Paper
                className={classes.root}
                data-test={ExRatesTable.displayName}
            ></Paper>
        );
    }
};

ExRatesTable.displayName = 'ExRatesTable';

// use API status component HOC
export default withApiStatus(ExRatesTable);
