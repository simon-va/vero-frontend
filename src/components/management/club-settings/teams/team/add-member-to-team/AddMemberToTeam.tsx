import { FC } from 'react';
import { Box, Button } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

const AddMemberToTeam: FC = () => {
    return (
        <>
            <Box
            >
                <Button

                    startIcon={ <AddOutlinedIcon/> }
                >
                    Mitglied hinzufügen
                </Button>
            </Box>
        </>
    );
};

export default AddMemberToTeam;
