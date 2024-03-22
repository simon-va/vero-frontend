import { AppDispatch } from '../index.ts';
import { postLogin, postRegister } from '../../api/user/post.ts';
import { setAccessToken, setRoute, setSelectedContent } from './slice.ts';
import { setSelectedClubId } from '../clubs/slice.ts';

interface HandleLoginProps {
    email: string;
    password: string;
}

export const handleLogin = ({ password, email }: HandleLoginProps) => async (dispatch: AppDispatch) => {
    const { status, data } = await postLogin({
        email,
        password
    });

    if (!status || !data) {
        return { message: 'Email oder Passwort ist falsch ' };
    }

    localStorage.setItem('accessToken', data.token);

    dispatch(setRoute('/clubs'));
    dispatch(setAccessToken(data.token));

    return { message: null };
};

interface HandleUserRegisterProps {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export const handleUserRegister = (payload: HandleUserRegisterProps) => {
    return async (dispatch: AppDispatch) => {
        const { status, data } = await postRegister({ payload });

        if (status !== 201 || !data) {
            if (status === 409) {
                return { message: 'Email bereits registriert' };
            }

            return { message: 'Fehler bei der Registrierung' };
        }

        localStorage.setItem('accessToken', data.token);
        dispatch(setAccessToken(data.token));
        dispatch(setRoute('/clubs'));
        return { message: null };
    };
};

interface ResetSelectedClubProps {
    preventLocalStorageRemove?: boolean;
    preventRouteChange?: boolean;
}

export const resetSelectedClub = (
    {
        preventLocalStorageRemove,
        preventRouteChange
    }: ResetSelectedClubProps = {}) => (dispatch: AppDispatch) => {
    if (!preventLocalStorageRemove) {
        localStorage.removeItem('selectedClubId');
    }

    if (!preventRouteChange) {
        dispatch(setRoute('/clubs'));
    }

    dispatch(setSelectedClubId(null));
    dispatch(setSelectedContent(-1));
};

export const handleLogout = () => (dispatch: AppDispatch) => {
    localStorage.removeItem('accessToken');

    dispatch(setRoute('/login'));

    dispatch(setAccessToken(null));
    dispatch(resetSelectedClub({
        preventRouteChange: true
    }));
};
