import { FC } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import styles from './navigation.styles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { selectSelectedRoute } from '../../redux-modules/app/selectors.ts';
import { setSelectedRoute } from '../../redux-modules/app/slice.ts';
import { Route } from '../../types/app.ts';

const Navigation: FC = () => {
    const selectedRoute = useAppSelector(selectSelectedRoute);

    const dispatch = useAppDispatch();

    const handleListItemClick = (
        _: unknown,
        route: Route
    ) => {
        dispatch(setSelectedRoute(route));
    };

    return (
        <Box sx={ styles.root }>
            <List>
                { ['Home'].map((text) => (
                    <ListItem key={ text } disablePadding>
                        <ListItemButton
                            selected={ selectedRoute === Route.Home }
                            onClick={ (event) => handleListItemClick(event, Route.Home) }
                        >
                            <ListItemIcon sx={ { minWidth: '40px' } }>
                                <HomeOutlinedIcon/>
                            </ListItemIcon>
                            <ListItemText primary={ text }/>
                        </ListItemButton>
                    </ListItem>
                )) }
            </List>
            <ListItem key="club-settings" disablePadding sx={ { marginTop: 'auto' } }>
                <ListItemButton
                    selected={ selectedRoute === Route.ClubSettings }
                    onClick={ (event) => handleListItemClick(event, Route.ClubSettings) }
                >
                    <ListItemIcon sx={ { minWidth: '40px' } }>
                        <HomeOutlinedIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Verein"/>
                </ListItemButton>
            </ListItem>
        </Box>
    );
};

export default Navigation;