import { FC, SyntheticEvent } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import styles from './clubSettingsMenu.styles.ts';

const settings = ['Allgemein', 'Module', 'Mitglieder', 'Gruppen'];

interface ClubSettingsMenuProps {
    selectedTab: number;
    setSelectedTab: (value: number) => void;
}

const ClubSettingsMenu: FC<ClubSettingsMenuProps> = ({ selectedTab, setSelectedTab }) => {
    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={styles.root}>
            <Box sx={styles.tabWrapper}>
                <Tabs value={selectedTab} onChange={handleChange}>
                    {settings.map((setting, index) => (
                        <Tab key={index} label={setting}/>
                    ))}
                </Tabs>
            </Box>
        </Box>
    );
};

export default ClubSettingsMenu;
