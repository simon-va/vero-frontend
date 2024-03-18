import { FC } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import styles from './navigation.styles.ts';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux.ts';
import { selectSelectedContent } from '../../../redux-modules/app/selectors.ts';
import { setSelectedContent } from '../../../redux-modules/app/slice.ts';
import { selectSelectedModules } from '../../../redux-modules/modules/selectors.ts';
import { ICON_LIST } from '../../../constants/module.tsx';

const Navigation: FC = () => {
    const selectedContent = useAppSelector(selectSelectedContent);
    const modules = useAppSelector(selectSelectedModules);

    const dispatch = useAppDispatch();

    const handleListItemClick = (
        _: unknown,
        route: number
    ) => {
        dispatch(setSelectedContent(route));
    };

    return (
        <Box sx={ styles.root }>
            <List>
                { modules.map(({ name, id }) => (
                    <ListItem key={ name } disablePadding>
                        <ListItemButton
                            selected={ selectedContent === id }
                            onClick={ (event) => handleListItemClick(event, id) }
                        >
                            <ListItemIcon sx={ { minWidth: '40px' } }>
                                { ICON_LIST.find((icon) => icon.id === id)?.component }
                            </ListItemIcon>
                            <ListItemText primary={ name }/>
                        </ListItemButton>
                    </ListItem>
                )) }
            </List>
            <ListItem key="club-settings" disablePadding sx={ { marginTop: 'auto' } }>
                <ListItemButton
                    selected={ selectedContent === -2 }
                    onClick={ (event) => handleListItemClick(event, -2) }
                >
                    <ListItemIcon sx={ { minWidth: '40px' } }>
                        { ICON_LIST.find((icon) => icon.id === -2)?.component }
                    </ListItemIcon>
                    <ListItemText primary="Verein"/>
                </ListItemButton>
            </ListItem>
        </Box>
    );
};

export default Navigation;