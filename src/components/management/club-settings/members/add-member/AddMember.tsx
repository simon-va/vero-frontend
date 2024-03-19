import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { FC, useState } from 'react';
import { useAppDispatch } from '../../../../../hooks/redux.ts';
import { saveMemberAdd } from '../../../../../redux-modules/members/actions.ts';

const AddMember: FC = () => {
    const [open, setOpen] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const dispatch = useAppDispatch();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        void dispatch(saveMemberAdd({ firstName, lastName }));

        setOpen(false);

        setFirstName('');
        setLastName('');
    };

    const isButtonDisabled = firstName.trim() === '' || lastName.trim() === '';

    return (
        <>
            <Box
                sx={ {
                    mt: '12px',
                    display: 'flex',
                    alignItems: 'center'
                } }
            >
                <Button
                    startIcon={ <AddOutlinedIcon/> }
                    onClick={ handleOpen }
                >
                    Mitglied hinzufügen
                </Button>
            </Box>
            <Dialog open={ open } onClose={ handleClose }>
                <DialogTitle>Neues Mitglied hinzufügen</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="firstName"
                        label="Vorname"
                        fullWidth
                        value={ firstName }
                        onChange={ (e) => setFirstName(e.target.value) }
                    />
                    <TextField
                        margin="dense"
                        id="lastName"
                        label="Nachname"
                        fullWidth
                        value={ lastName }
                        onChange={ (e) => setLastName(e.target.value) }
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

export default AddMember;