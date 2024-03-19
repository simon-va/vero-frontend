import { FC, ReactNode, SyntheticEvent, useState } from 'react';
import PaperWrapper from '../shared/paper-wrapper/PaperWrapper.tsx';
import { useAppDispatch } from '../../hooks/redux.ts';
import { Box, IconButton, Tab, Tabs, Typography } from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StylesTheme } from '../../types/mui.ts';
import { setAccessToken } from '../../redux-modules/app/slice.ts';
import MyClubs from './my-clubs/MyClubs.tsx';
import AddClub from './add-club/AddClub.tsx';
import { setSelectedClubId } from '../../redux-modules/clubs/slice.ts';

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index } = props;

    return (
        <div
            role="tabpanel"
            hidden={ value !== index }
            id={ `simple-tabpanel-${ index }` }
            aria-labelledby={ `simple-tab-${ index }` }
        >
            { value === index && (
                <Box sx={ { pt: '12px' } }>
                    { children }
                </Box>
            ) }
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${ index }`,
        'aria-controls': `simple-tabpanel-${ index }`
    };
}

const styles: StylesTheme = {
    logo: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '12px',
        justifyContent: 'center',
        marginBottom: '12px'
    }
};

const Clubs: FC = () => {
    const [value, setValue] = useState(0);

    const dispatch = useAppDispatch();

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('selectedClubId');

        dispatch(setAccessToken(null));
        dispatch(setSelectedClubId(null));
    };

    return (
        <PaperWrapper>
            <IconButton
                sx={ {
                    position: 'absolute'
                } }
                onClick={ handleLogout }
            >
                <ArrowBackIcon/>
            </IconButton>
            <Box sx={ { width: '100%' } }>
                <Box sx={ styles.logo }>
                    <CameraIcon fontSize="large" color="primary"/>
                    <Typography variant="h4">
                        VerO
                    </Typography>
                </Box>
                <Box sx={ { borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' } }>
                    <Tabs value={ value } onChange={ handleChange } aria-label="basic tabs example">
                        <Tab label="Meine Vereine" { ...a11yProps(0) } />
                        <Tab label="Verein erstellen" { ...a11yProps(1) } />
                    </Tabs>
                </Box>
                <CustomTabPanel value={ value } index={ 0 }>
                    <MyClubs/>
                </CustomTabPanel>
                <CustomTabPanel value={ value } index={ 1 }>
                    <AddClub/>
                </CustomTabPanel>
            </Box>
        </PaperWrapper>

    );
};

export default Clubs;