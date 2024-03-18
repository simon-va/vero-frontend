import { FC, SyntheticEvent } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import styles from './clubSettingsMenu.styles.ts';

const settings = ['Allgemein', 'Module', 'Mitglieder', 'Teams'];

const a11yProps = (index: number) => {
    return {
        id: `tab-${ index }`,
        'aria-controls': `tabpanel-${ index }`
    };
};

interface ClubSettingsMenuProps {
    selectedTab: number;
    setSelectedTab: (value: number) => void;
}

const ClubSettingsMenu: FC<ClubSettingsMenuProps> = ({ selectedTab, setSelectedTab }) => {
    const handleChange = (_: SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Box sx={ styles.root }>
            <Box sx={ { borderBottom: 1, borderColor: 'divider' } }>
                <Tabs value={ selectedTab } onChange={ handleChange } aria-label="basic tabs example">
                    { settings.map((setting, index) => (
                        <Tab key={ index } label={ setting } { ...a11yProps(index) } />
                    )) }
                </Tabs>
            </Box>
        </Box>
    );
};

export default ClubSettingsMenu;
