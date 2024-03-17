import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
    interface Theme {
        custom: {
            contentBackground: string
        };
    }

    interface ThemeOptions {
        custom: {
            contentBackground: string
        };
    }
}

export const theme = createTheme({
    palette: {
        primary: {
            main: '#444BDE'
        },
        secondary: {
            main: '#f50057'
        },
        text: {
            primary: 'rgba(63,69,104,0.87)',
            secondary: 'rgba(63,69,104,0.6)',
            disabled: 'rgba(63,69,104,0.38)'
        },
        background: {
            default: '#F8F9FD'
        }
    },
    custom: {
        contentBackground: '#fff'
    }
});
