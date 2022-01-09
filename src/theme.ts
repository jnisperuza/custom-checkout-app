import { createTheme } from '@mui/material/styles';

export enum MaterialPalette {
    Primary = 'primary',
    Inherit = 'inherit',
    Secondary = 'secondary'
}

export default createTheme({
    palette: {
        primary: {
            main: '#f71963',
        },
        secondary: {
            main: '#383938',
        },

    }
});