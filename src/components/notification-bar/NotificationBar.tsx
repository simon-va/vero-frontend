import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { hideNotification } from '../../redux-modules/notification/slice.ts';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert (
    props,
    ref
) {
    return <MuiAlert elevation={ 6 } ref={ ref } variant="filled" { ...props } />;
});

const NotificationBar = () => {
    const dispatch = useAppDispatch();
    const { open, message, type } = useAppSelector((state) => state.notification);

    const handleClose = (
        _?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        dispatch(hideNotification());
    };

    return (
        <Stack spacing={ 2 } sx={ { width: '100%' } }>
            <Snackbar
                open={ open }
                autoHideDuration={ 6000 }
                onClose={ handleClose }
                anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
            >
                <Alert onClose={ handleClose } severity={ type } sx={ { width: '100%' } }>
                    { message }
                </Alert>
            </Snackbar>
        </Stack>
    );
};

export default NotificationBar;