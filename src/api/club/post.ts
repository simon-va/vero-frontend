import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';
import { AddClubData } from '../../types/club.ts';

interface PostClubProps {
    name: string;
    accessToken: string | null;
}

export const postClub = async ({ name, accessToken }: PostClubProps): Promise<ApiFunctionResult<AddClubData>> => {
    const response = await request<AddClubData, { name: string }>({
        route: '/clubs',
        method: 'POST',
        body: {
            name
        },
        accessToken
    });

    return { status: response.status, data: response.data };
};