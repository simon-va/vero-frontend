import { FC } from 'react';
import { theme } from '../utils/theme.ts';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import Header from '../components/header/Header.tsx';
import Navigation from '../components/navigation/Navigation.tsx';
import { Outlet } from 'react-router-dom';

const styles = {
    container: {
        flex: 1,
        display: 'flex',
        alignItems: 'stretch'
    },
    content: {
        flex: 1
    }
};

const Root: FC = () => {
    return (
        <ThemeProvider theme={ theme }>
            <CssBaseline/>
            <Header/>
            <Box sx={ styles.container }>
                <Navigation/>
                <Box sx={ styles.content }>
                    <Outlet/>
                </Box>
            </Box>
        </ThemeProvider>
    );
};

export default Root;