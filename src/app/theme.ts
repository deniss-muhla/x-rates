import { createMuiTheme } from '@material-ui/core/styles';
import { teal, amber, deepOrange } from '@material-ui/core/colors';

export default createMuiTheme({
    palette: {
        type: 'dark',
        primary: {
            light: teal[600],
            main: teal[700],
            dark: teal[900]
        },
        secondary: {
            light: amber[600],
            main: amber[700],
            dark: amber[900]
        },
        error: {
            light: deepOrange[400],
            main: deepOrange[600],
            dark: deepOrange[800]
        }
    },
    transitions: {
        duration: {
            enteringScreen: 200,
            leavingScreen: 200
        }
    }
});
