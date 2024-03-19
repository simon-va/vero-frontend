import { AppDispatch } from '../index.ts';
import { postLogin } from '../../api/user/post.ts';
import { setAccessToken } from './slice.ts';

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