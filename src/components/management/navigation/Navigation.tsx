import { FC } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import styles from './navigation.styles.ts';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.ts';
import { selectSelectedContent } from '../../../redux-modules/app/selectors.ts';
import { setSelectedContent } from '../../../redux-modules/app/slice.ts';
import { Content } from '../../../types/app.ts';

const Navigation: FC = () => {
    const selectedContent = useAppSelector(selectSelectedContent);

    const dispatch = useAppDispatch();

    const handleListItemClick = (
        _: unknown,
        route: Content
    ) => {
        dispatch(setSelectedContent(route));
    };

    return (
        <Box sx={ styles.root }>
            <List>
                { ['Home'].map((text) => (
                    <ListItem key={ text } disablePadding>
                        <ListItemButton
                            selected={ selectedContent === Content.Home }
                            onClick={ (event) => handleListItemClick(event, Content.Home) }
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
                    selected={ selectedContent === Content.ClubSettings }
                    onClick={ (event) => handleListItemClick(event, Content.ClubSettings) }
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