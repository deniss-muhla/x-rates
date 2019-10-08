import React, { FunctionComponent, useEffect } from 'react';

type ApiStatusProps = {
    isPending: boolean;
    error?: string;
};

// Higher Order Component for async API data rendering
const withApiStatus = <P extends object>(
    WrappedComponent: FunctionComponent<P>
): FunctionComponent<P & ApiStatusProps> => {
    return props => {
        const { isPending, error } = props;

        // Error alert side effect
        useEffect(() => {
            if (error) {
                window.alert(error);
            }
        }, [error]); // Only re-run the effect if count changes

        if (isPending) {
            // render loading component
            return <span data-test={'ApiLoading'}>{'Loading...'}</span>;
        } else if (error) {
            // render error and wrapped component
            return (
                <>
                    <span data-test={'ApiError'}>{`Error: ${error}`}</span>
                    <WrappedComponent {...props} />
                </>
            );
        } else {
            // render wrapped component
            return <WrappedComponent {...props} />;
        }
    };
};

export default withApiStatus;
