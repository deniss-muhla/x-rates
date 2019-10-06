import React, { FunctionComponent } from 'react';

type ApiStatusProps = {
    isPending: boolean;
    error?: string;
};

const withApiStatus = <P extends object>(
    WrappedComponent: FunctionComponent<P>
): FunctionComponent<P & ApiStatusProps> => {
    return props => {
        const { isPending, error } = props;
        if (isPending) {
            // render loading component
            return <span>{'Loading...'}</span>;
        } else if (error) {
            // render error and wrapped component
            return (
                <>
                    <span>{`Error: ${error}`}</span>
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
