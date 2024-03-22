import { ChangeEvent, FC, useState } from 'react';
import PaperWrapper from '../shared/paper-wrapper/PaperWrapper.tsx';
import { StylesTheme } from '../../types/mui.ts';
import { Box, Button, Grid, IconButton, TextField, Typography } from '@mui/material';
import CameraIcon from '@mui/icons-material/Camera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch } from '../../hooks/redux.ts';
import { setRoute } from '../../redux-modules/app/slice.ts';
import { handleUserRegister } from '../../redux-modules/app/actions.ts';

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
        mt: '36px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    }
};

const Register: FC = () => {
    const [registerData, setRegisterData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const dispatch = useAppDispatch();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setRegisterData({
            ...registerData,
            [name]: value
        });
    };

    const handleGoBackClick = () => {
        dispatch(setRoute('/login'));
    };

    const handleSubmit = async () => {
        const { message } = await dispatch(handleUserRegister(registerData));

        setErrorMessage(message);
    };

    const isRegisterDisabled = registerData.firstName.trim().length === 0
        || registerData.lastName.trim().length === 0
        || registerData.email.trim().length === 0
        || registerData.password.trim().length <= 6;

    return (
        <PaperWrapper>
            <IconButton
                sx={ {
                    position: 'absolute'
                } }
                onClick={ handleGoBackClick }
            >
                <ArrowBackIcon/>
            </IconButton>
            <Box sx={ styles.root }>
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
                    <Grid container spacing={ 2 }>
                        <Grid item xs={ 6 }>
                            <TextField
                                required
                                fullWidth
                                label="First Name"
                                name="firstName"
                                value={ registerData.firstName }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={ 6 }>
                            <TextField
                                required
                                fullWidth
                                label="Last Name"
                                name="lastName"
                                value={ registerData.lastName }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                value={ registerData.email }
                                onChange={ handleChange }
                            />
                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField
                                required
                                fullWidth
                                type="password"
                                label="Password"
                                name="password"
                                value={ registerData.password }
                                onChange={ handleChange }
                            />
                        </Grid>
                    </Grid>
                    <Box id="login-unseccessful">
                        { errorMessage && (
                            <Typography component="footer" sx={ { color: 'red' } }>
                                { errorMessage }
                            </Typography>
                        ) }
                    </Box>
                    <Button
                        onClick={ handleSubmit }
                        disabled={ isRegisterDisabled }
                        fullWidth
                        variant="contained"
                        sx={ {
                            mt: 3
                        } }
                    >
                        Registrieren
                    </Button>
                </Box>
            </Box>
        </PaperWrapper>
    );
};

export default Register;

