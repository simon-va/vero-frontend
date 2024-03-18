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