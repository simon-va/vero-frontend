import { FC, ReactNode, SyntheticEvent, useState } from 'react';
import PaperWrapper from '../shared/paper-wrapper/PaperWrapper.tsx';
import { selectClubs } from '../../redux-modules/clubs/selectors.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { Box, IconButton, List, ListItemButton, ListItemText, Tab, Tabs, Typography } from '@mui/material';
import { setSelectedClubId } from '../../redux-modules/clubs/slice.ts';
import CameraIcon from '@mui/icons-material/Camera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { StylesTheme } from '../../types/mui.ts';
import { setAccessToken } from '../../redux-modules/app/slice.ts';

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
    const clubs = useAppSelector(selectClubs);
    const [value, setValue] = useState(0);

    const dispatch = useAppDispatch();

    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleSelectClub = (clubId: number) => {
        dispatch(setSelectedClubId(clubId));
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');

        dispatch(setAccessToken(null));
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
                    <List component="nav">
                        {
                            clubs.map((club) => (
                                <ListItemButton key={ club.id } onClick={ () => handleSelectClub(club.id) }>
                                    <ListItemText primary={ club.name }/>
                                </ListItemButton>
                            ))
                        }
                        {
                            clubs.length === 0 && (
                                <Typography variant="body2" sx={ { textAlign: 'center' } }>
                                    Du bist in keinem Verein
                                </Typography>
                            )
                        }
                    </List>
                </CustomTabPanel>
                <CustomTabPanel value={ value } index={ 1 }>
                    Item Two
                </CustomTabPanel>
            </Box>
        </PaperWrapper>

    );
};

export default Clubs;