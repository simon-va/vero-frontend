import { FC } from 'react';
import { Box, Divider, Typography } from '@mui/material';

const Teams: FC = () => {
    return (
        <Box>
            <Typography variant="body1" sx={ { p: 2 } }>
                Mit Teams können Mitglieder im Verein gruppiert werden. Beim Fußball könnte das zum Beispiel eine Mannschaft sein.
            </Typography>
            <Divider/>
        </Box>
    );
}

export default Teams;