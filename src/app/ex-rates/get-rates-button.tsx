import React, { FunctionComponent } from 'react';
import { useTheme, Zoom, Fab, makeStyles, Box } from '@material-ui/core';
import EurIcon from '../components/icons/eur-icon';
import { CSSProperties } from '@material-ui/styles';
import clsx from 'clsx';
import RefreshIcon from '../components/icons/refresh-icon';

type GetRatesButtonProps = {
    isPending: boolean;
    isEmptyRates: boolean;
    onClick: () => void;
};

const useStyles = makeStyles(theme => ({
    button: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        width: 60,
        height: 60,
        outline: 0,
        zIndex: theme.zIndex.drawer,
        left: '50%',
        marginLeft: -30
    } as CSSProperties,
    buttonCenter: {
        top: '50%',
        marginTop: -30
    } as CSSProperties,
    buttonTop: {
        top: theme.spacing(2),
        marginTop: 0
    } as CSSProperties,
    fab: {
        alignSelf: 'center'
    } as CSSProperties
}));

const buttons = [
    {
        key: 'center',
        showOnEmpty: true,
        icon: <EurIcon />
    },
    {
        key: 'top',
        showOnEmpty: false,
        icon: <RefreshIcon />
    }
];

const GetRatesButton: FunctionComponent<GetRatesButtonProps> = ({
    isPending,
    isEmptyRates,
    onClick
}) => {
    const classes = useStyles();
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen
    };

    return (
        <>
            {buttons.map(btn => {
                const show = btn.showOnEmpty === isEmptyRates;
                return (
                    <Zoom
                        key={btn.key}
                        in={show}
                        timeout={transitionDuration}
                        style={{
                            transitionDelay: `${
                                show ? transitionDuration.exit : 0
                            }ms`
                        }}
                        unmountOnExit
                    >
                        <Box
                            className={clsx(classes.button, {
                                [classes.buttonCenter]: btn.showOnEmpty,
                                [classes.buttonTop]: !btn.showOnEmpty
                            })}
                        >
                            <Fab
                                data-test={'GetRates-button'}
                                aria-label={'refresh'}
                                className={classes.fab}
                                color={'secondary'}
                                onClick={isPending ? () => {} : onClick}
                            >
                                {btn.icon}
                            </Fab>
                        </Box>
                    </Zoom>
                );
            })}
        </>
    );
};

GetRatesButton.displayName = 'GetRatesButton';

export default GetRatesButton;
