import React, {
    FunctionComponent,
    useEffect,
    useState,
    useCallback
} from 'react';
import {
    Typography,
    LinearProgress,
    Fade,
    makeStyles,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core';
import { CSSProperties } from '@material-ui/styles';

type ApiStatusProps = {
    isPending: boolean;
    error?: string;
};

const useStyles = makeStyles(theme => ({
    progress: {
        left: 0,
        right: 0,
        position: 'absolute',
        zIndex: theme.zIndex.appBar
    } as CSSProperties
}));

// Higher Order Component for async API data rendering
const withApiStatus = <P extends object>(
    WrappedComponent: FunctionComponent<P>
): FunctionComponent<P & ApiStatusProps> => {
    return props => {
        const { isPending, error } = props;
        const classes = useStyles();
        const theme = useTheme();
        // loading animation delays
        const transitionDuration = {
            enter: theme.transitions.duration.enteringScreen,
            exit: theme.transitions.duration.leavingScreen * 8
        };

        // modal dialog state
        const [isErrorOpen, setIsErrorOpen] = useState(false);
        const closeErrorHandler = useCallback(() => setIsErrorOpen(false), [
            setIsErrorOpen
        ]);

        // Error alert side effect
        useEffect(() => {
            if (error) {
                setIsErrorOpen(true);
            } else {
                setIsErrorOpen(false);
            }
        }, [error, setIsErrorOpen]);

        return (
            <>
                <Fade
                    key={'progress'}
                    in={isPending}
                    timeout={transitionDuration}
                    unmountOnExit={true}
                >
                    <LinearProgress
                        color={'secondary'}
                        className={classes.progress}
                        data-test={'ApiLoading'}
                    />
                </Fade>
                <Dialog
                    open={isErrorOpen}
                    onClose={closeErrorHandler}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle disableTypography id="alert-dialog-title">
                        <Typography color={'error'}>{'Error'}</Typography>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            data-test={'ApiError'}
                            id="alert-dialog-description"
                        >
                            {error}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            data-test={'ApiErrorCloseButton'}
                            onClick={closeErrorHandler}
                            color="primary"
                        >
                            {'Close'}
                        </Button>
                    </DialogActions>
                </Dialog>
                <WrappedComponent {...props} />
            </>
        );
    };
};

export default withApiStatus;
