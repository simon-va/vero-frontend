import { FC, ReactNode, useState } from 'react';
import { Box, Typography } from '@mui/material';
import ClubSettingsMenu from './club-settings-menu/ClubSettingsMenu.tsx';
import Modules from './modules/Modules.tsx';

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
                <Box>
                    { children }
                </Box>
            ) }
        </div>
    );
}

const ClubSettings: FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <Box>
            <Typography variant="h4">
                Verein
            </Typography>
            <ClubSettingsMenu
                selectedTab={ selectedTab }
                setSelectedTab={ setSelectedTab }
            />
            <CustomTabPanel value={ selectedTab } index={ 0 }>
                <div>Allgeines über den Verein</div>
            </CustomTabPanel>
            <CustomTabPanel value={ selectedTab } index={ 1 }>
                <Modules/>
            </CustomTabPanel>
            <CustomTabPanel value={ selectedTab } index={ 2 }>
                <div>Mitglieder</div>
            </CustomTabPanel>
            <CustomTabPanel value={ selectedTab } index={ 3 }>
                <div>Teams</div>
            </CustomTabPanel>
        </Box>
    );
};

export default ClubSettings;