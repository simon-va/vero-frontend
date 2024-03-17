import { FC, useState } from 'react';
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import styles from './navigation.styles';

const Navigation: FC = () => {
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const handleListItemClick = (
        _: unknown,
        index: number
    ) => {
        setSelectedIndex(index);
    };

    return (
        <Box sx={ styles.root }>
            <List>
                { ['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                    <ListItem key={ text } disablePadding>
                        <ListItemButton
                            selected={ selectedIndex === index }
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
                    selected={ selectedIndex === 4 }
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