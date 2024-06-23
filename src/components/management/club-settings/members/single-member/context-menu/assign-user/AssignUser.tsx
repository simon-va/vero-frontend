import { ChangeEvent, FC, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { saveAssignUserToMember } from '../../../../../../../redux-modules/members/actions.ts';
import { useAppDispatch } from '../../../../../../../hooks/redux.ts';

interface AssignUserProps {
    isOpen: boolean;
    onClose: () => void;
    memberId: number;
}

const AssignUser: FC<AssignUserProps> = ({ isOpen, onClose, memberId }) => {
    const [email, setEmail] = useState('');

    const dispatch = useAppDispatch();

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = () => {
        onClose();
        void dispatch(saveAssignUserToMember({
            memberId,
            email
        }))
    };

    return (
        <Dialog
            open={ isOpen }
            onClose={ onClose }
            fullWidth
        >
            <DialogTitle>Benutzer zuweisen</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Bitte gib die Email des Benutzers ein, dem du dieses Mitglied zuweisen möchten. Vergewissere dich,
                    dass die angegebene Email existiert.
                </DialogContentText>
                <TextField
                    sx={ {
                        marginTop: '12px'
                    } }
                    label="Email des Benutzers"
                    fullWidth
                    value={ email }
                    onChange={ handleEmailChange }
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={ onClose }>Abbrechen</Button>
                <Button onClick={ handleSubmit }>Bestätigen</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignUser;