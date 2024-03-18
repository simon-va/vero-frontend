import { ChangeEvent, FC, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useAppDispatch } from '../../../hooks/redux';
import { saveClubAdd } from '../../../redux-modules/clubs/actions.ts';

const AddClub: FC = () => {
    const [localClubName, setLocalClubName] = useState('');

    const dispatch = useAppDispatch();

    const handleAddClub = () => {
        void dispatch(saveClubAdd(localClubName));
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalClubName(e.target.value);
    };

    const isAddClubDisabled = localClubName.trim().length === 0;

    return (
        <Box
            sx={ {
                marginTop: '12px'
            } }
        >
            <TextField
                label="Vereinsname"
                fullWidth
                value={ localClubName }
                onChange={ handleChange }
                onKeyDownCapture={ (event) => {
                    if (event.key === 'Enter' && !isAddClubDisabled) {
                        handleAddClub();
                    }
                } }
            />
            <Button
                onClick={ handleAddClub }
                disabled={ isAddClubDisabled }
                fullWidth
                variant="contained"
                sx={ {
                    mt: 3
                } }
            >
                Verein erstellen
            </Button>
        </Box>
    );
};

export default AddClub;
