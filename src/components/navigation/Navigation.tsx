import { FC } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import styles from './navigation.styles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { selectSelectedRoute } from '../../redux-modules/app/selectors.ts';
import { setSelectedRoute } from '../../redux-modules/app/slice.ts';

const Navigation: FC = () => {
    const selectedRoute = useAppSelector(selectSelectedRoute);

    const dispatch = useAppDispatch();

    const handleListItemClick = (
        _: unknown,
        index: number
    ) => {
        dispatch(setSelectedRoute(index));
    };

    return (
        <Box sx={ styles.root }>
            <List>
                { ['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={ text } disablePadding>
                        <ListItemButton
                            selected={ selectedRoute === index }
                            onClick={ (event) => handleListItemClick(event, index) }
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
                    selected={ selectedRoute === 4 }
                    onClick={ (event) => handleListItemClick(event, 4) }
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