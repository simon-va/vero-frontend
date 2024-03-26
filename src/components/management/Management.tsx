import { useAppSelector } from '../../hooks/redux.ts';
import { selectSelectedContent } from '../../redux-modules/app/selectors.ts';
import { FC, useMemo } from 'react';
import ClubSettings from './club-settings/ClubSettings.tsx';
import Home from './home/Home.tsx';
import { Box, CssBaseline } from '@mui/material';
import Header from './header/Header.tsx';
import Navigation from './navigation/Navigation.tsx';
import styles from './management.styles.ts';


const Management: FC = () => {
    const selectedContent = useAppSelector(selectSelectedContent);

    const content = useMemo(() => {
        switch (selectedContent) {
            case -1:
                return <Home/>;
            case -2:
                return <ClubSettings/>;
            case 5:
                return <div>Mitgliedschaft</div>;
            default:
                return <div>Page not found</div>;
        }
    }, [selectedContent]);

    return (
        <>
            <CssBaseline/>
            <Header/>
            <Box sx={ styles.container }>
                <Navigation/>
                <Box sx={ styles.content }>
                    <Box sx={ styles.contentWrapper }>
                        { content }
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Management;