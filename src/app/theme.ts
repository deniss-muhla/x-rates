import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
    palette: {
        type: 'dark'
    },
    transitions: {
        duration: {
            enteringScreen: 200,
            leavingScreen: 200
        }
    }
});
