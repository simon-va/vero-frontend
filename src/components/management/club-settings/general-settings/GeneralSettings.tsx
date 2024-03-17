import { FC } from 'react';
import { Box, Divider, Typography } from '@mui/material';

const GeneralSettings: FC = () => {
    return (
        <Box>
            <Typography variant="body1" sx={ { p: 2 } }>
                Hier kannst du allgemeine Einstellungen für deinen Verein vornehmen.
            </Typography>
            <Divider/>
        </Box>
    );
};

export default GeneralSettings;