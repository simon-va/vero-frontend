import { FC } from 'react';
import { Box, Divider, Typography } from '@mui/material';

const Members: FC = () => {
    return (
        <Box>
            <Typography variant="body1" sx={ { p: 2 } }>
                Mitglieder machen den Verein zu dem, was er ist. Hier kannst du Mitglieder hinzufügen, bearbeiten und
                löschen.
            </Typography>
            <Divider/>
        </Box>
    );
};

export default Members;