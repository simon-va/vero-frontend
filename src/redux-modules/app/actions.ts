import { AppDispatch } from '../index.ts';
import { postLogin } from '../../api/user/post.ts';
import { setAccessToken, setSelectedContent } from './slice.ts';
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

    dispatch(setAccessToken(data.token));

    return { message: null };
};

interface ResetSelectedClubProps {
    preventLocalStorageRemove?: boolean;
}

export const resetSelectedClub = ({ preventLocalStorageRemove }: ResetSelectedClubProps = {}) => (dispatch: AppDispatch) => {
    if (!preventLocalStorageRemove) {
        localStorage.removeItem('selectedClubId');
    }

    dispatch(setSelectedClubId(null));
    dispatch(setSelectedContent(-1));
};

export const handleLogout = () => (dispatch: AppDispatch) => {
    localStorage.removeItem('accessToken');
    dispatch(setAccessToken(null));

    dispatch(resetSelectedClub());
};
