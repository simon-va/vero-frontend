import { FC } from 'react';
import { Box, Divider, Typography } from '@mui/material';
import DeleteClub from './delete-club/DeleteClub.tsx';

const GeneralSettings: FC = () => {
    return (
        <Box>
            <Typography variant="body1" sx={ { p: 2 } }>
                Hier kannst du allgemeine Einstellungen für deinen Verein vornehmen.
            </Typography>
            <Divider/>
            <DeleteClub/>
        </Box>
    );
};

export default GeneralSettings;