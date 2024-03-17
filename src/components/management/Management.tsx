import { useAppSelector } from '../../hooks/redux.ts';
import { selectSelectedContent } from '../../redux-modules/app/selectors.ts';
import { FC, useMemo } from 'react';
import { Content } from '../../types/app.ts';
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
            case Content.ClubSettings:
                return <ClubSettings/>;
            default:
                return <Home/>;
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