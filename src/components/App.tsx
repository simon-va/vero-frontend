import { FC, useMemo } from 'react';
import { Box, CssBaseline } from '@mui/material';
import Header from './header/Header.tsx';
import Navigation from './navigation/Navigation.tsx';
import ContentWrapper from './content-wrapper/ContentWrapper.tsx';
import { useAppSelector } from '../hooks/redux.ts';
import { selectSelectedRoute } from '../redux-modules/app/selectors.ts';
import { Route } from '../types/app.ts';
import Home from './home/Home.tsx';
import ClubSettings from './club-settings/ClubSettings.tsx';

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

const App: FC = () => {
    const selectedRoute = useAppSelector(selectSelectedRoute);

    const content = useMemo(() => {
        switch (selectedRoute) {
            case Route.ClubSettings:
                return <ClubSettings/>;
            default:
                return <Home/>;

        }
    }, [selectedRoute]);

    return (
        <>
            <CssBaseline/>
            <Header/>
            <Box sx={ styles.container }>
                <Navigation/>
                <Box sx={ styles.content }>
                    <ContentWrapper>
                        { content }
                    </ContentWrapper>
                </Box>
            </Box>
        </>

    );
};

export default App;