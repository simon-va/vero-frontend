import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../../../../hooks/redux.ts';
import { saveTeamAdd } from '../../../../../redux-modules/teams/actions.ts';

const AddTeam: FC = () => {
    const [open, setOpen] = useState(false);
    const [localTeamName, setLocalTeamName] = useState('');

    const dispatch = useAppDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        void dispatch(saveTeamAdd({ name: localTeamName }));

        setOpen(false);

        setLocalTeamName('');
    };

    const isButtonDisabled = localTeamName.trim() === '';


    return (
        <>
            <Box
                sx={ {
                    mt: '12px'
                } }
            >
                <Button
                    onClick={ handleOpen }
                    startIcon={ <AddOutlinedIcon/> }
                >
                    Team hinzufügen
                </Button>
            </Box>
            <Dialog open={ open } onClose={ handleClose }>
                <DialogTitle>Neues Team hinzufügen</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="teamName"
                        label="Teamname"
                        fullWidth
                        value={ localTeamName }
                        onChange={ (e) => setLocalTeamName(e.target.value) }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose }>
                        Abbrechen
                    </Button>
                    <Button
                        onClick={ handleSave }
                        disabled={ isButtonDisabled }
                    >
                        Speichern
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AddTeam;