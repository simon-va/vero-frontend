import { FC, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux.ts';
import { Box, Button, Link, TextField, Typography } from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import { StylesTheme } from '../../types/mui.ts';
import { handleLogin } from '../../redux-modules/app/actions.ts';
import PaperWrapper from '../shared/paper-wrapper/PaperWrapper.tsx';
import { setRoute } from '../../redux-modules/app/slice.ts';

const styles: StylesTheme = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%'
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '12px'
    },
    form: {
        mt: '20px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    }
};

const Login: FC = () => {
    const [localEmail, setLocalEmail] = useState('');
    const [localPassword, setLocalPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useAppDispatch();

    const isLoginDisabled = localPassword.trim().length === 0 || localEmail.trim().length === 0 || isLoading;

    const handleSubmit = async () => {
        setIsLoading(true);

        await dispatch(handleLogin({
            email: localEmail,
            password: localPassword
        }));

        setIsLoading(false);
        setLocalPassword('');
        setLocalEmail('');
    };

    const handleRegisterClick = () => {
        dispatch(setRoute('/register'));
    };

    return (
        <PaperWrapper>
            <Box
                sx={ styles.root }
            >
                <Box sx={ styles.logo }>
                    <CameraIcon fontSize="large" color="primary"/>
                    <Typography variant="h4">
                        VerO
                    </Typography>
                </Box>
                <Box
                    component="form"
                    noValidate
                    sx={ styles.form }
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        value={ localEmail }
                        onChange={ (event) => setLocalEmail(event.target.value) }
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Kennwort"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={ localPassword }
                        onChange={ (event) => setLocalPassword(event.target.value) }
                        onKeyDownCapture={ (event) => {
                            if (event.key === 'Enter' && !isLoginDisabled) {
                                void handleSubmit();
                            }
                        } }
                    />
                    <Box>
                        <Link
                            sx={ {
                                cursor: 'pointer',
                                float: 'right'
                            } }
                            onClick={ handleRegisterClick }
                        >
                            <Typography>
                                Registrieren
                            </Typography>
                        </Link>
                    </Box>
                    <Button
                        onClick={ handleSubmit }
                        disabled={ isLoginDisabled }
                        fullWidth
                        variant="contained"
                        sx={ {
                            mt: 3
                        } }
                    >
                        Anmelden
                    </Button>
                    <Box sx={ {
                        marginTop: 'auto',
                        textAlign: 'center'
                    } }>
                        Datenschutz | Impressum
                    </Box>
                </Box>
            </Box>
        </PaperWrapper>
    );
};

export default Login;