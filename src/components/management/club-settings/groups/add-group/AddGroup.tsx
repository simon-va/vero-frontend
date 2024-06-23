import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../../../../hooks/redux.ts';
import { saveGroupAdd } from '../../../../../redux-modules/groups/actions.ts';

const AddGroup: FC = () => {
    const [open, setOpen] = useState(false);
    const [localGroupName, setLocalGroupName] = useState('');

    const dispatch = useAppDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        void dispatch(saveGroupAdd({ name: localGroupName }));

        setOpen(false);

        setLocalGroupName('');
    };

    const isButtonDisabled = localGroupName.trim() === '';


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
                    Gruppe hinzufügen
                </Button>
            </Box>
            <Dialog
                open={ open }
                onClose={ handleClose }
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle>Neue Gruppe hinzufügen</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="groupName"
                        label="Gruppenname"
                        fullWidth
                        value={ localGroupName }
                        onChange={ (e) => setLocalGroupName(e.target.value) }
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

export default AddGroup;
