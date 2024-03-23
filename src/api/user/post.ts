import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface PostLoginProps {
    email: string;
    password: string;
}

interface PostLoginData {
    token: string;
}

export const postLogin = async ({ password, email }: PostLoginProps): Promise<ApiFunctionResult<PostLoginData>> => {
    const response = await request<PostLoginData, PostLoginProps>({
        method: 'POST',
        route: '/users/login',
        body: {
            email,
            password
        }
    });

    return { status: response.status, data: response.data };
};

interface User {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface PostRegisterProps {
    payload: User;
}

interface PostRegisterData extends User {
    token: string;
}

export const postRegister = async ({ payload }: PostRegisterProps): Promise<ApiFunctionResult<PostRegisterData>> => {
    const response = await request<PostRegisterData, User>({
        method: 'POST',
        route: '/users/register',
        body: {
            ...payload,
            email: payload.email.toLowerCase().trim()
        }
    });

    return { status: response.status, data: response.data };
};