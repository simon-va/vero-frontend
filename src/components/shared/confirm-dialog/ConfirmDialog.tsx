import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { FC } from 'react';

interface ConfirmDialogProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    message?: string;
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
    return (
        <Dialog
            open={ isOpen }
            onClose={ onClose }
        >
            <DialogTitle>{ title }</DialogTitle>
            <DialogContent>
                <DialogContentText>{ message }</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={ onClose }>Abbrechen</Button>
                <Button onClick={ onConfirm }>Bestätigen</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;