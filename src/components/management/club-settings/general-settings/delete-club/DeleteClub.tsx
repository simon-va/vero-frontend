import { FC, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/redux.ts';
import { selectSelectedClub } from '../../../../../redux-modules/clubs/selectors.ts';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { saveClubRemove } from '../../../../../redux-modules/clubs/actions.ts';

const DeleteClub: FC = () => {
    const club = useAppSelector(selectSelectedClub)!;
    const [open, setOpen] = useState(false);
    const [inputName, setInputName] = useState('');
    const [isNameValid, setIsNameValid] = useState(false);

    const dispatch = useAppDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setInputName('');
        setIsNameValid(false);
    };

    const handleDelete = () => {
        void dispatch(saveClubRemove());

        // Add your delete logic here
        setInputName('');
        setIsNameValid(false);
        setOpen(false);
    };

    const handleInputChange = (event) => {
        setInputName(event.target.value);
        setIsNameValid(event.target.value === club.name);
    };

    return (
        <>
            <Button
                color="error"
                onClick={ handleClickOpen }
                sx={{
                    marginTop: '12px'
                }}
            >
                Verein löschen
            </Button>
            <Dialog open={ open } onClose={ handleClose }>
                <DialogTitle>Verein löschen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lösche den Verein <strong>{ club.name }</strong> durch das Eingeben des Vereinsnamens.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Vereinsname"
                        type="text"
                        fullWidth
                        value={ inputName }
                        onChange={ handleInputChange }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={ handleClose } color="primary">
                        Abbrechen
                    </Button>
                    <Button onClick={ handleDelete } color="secondary" disabled={ !isNameValid }>
                        Löschen
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DeleteClub;
