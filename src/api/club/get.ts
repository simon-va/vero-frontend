import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';
import { Club } from '../../types/club.ts';

interface GetClubsProps {
    accessToken: string | null;
}

export const getClubs = async ({ accessToken }: GetClubsProps): Promise<ApiFunctionResult<Club[]>> => {
    const response = await request<Club[]>({
        route: '/clubs',
        method: 'GET',
        accessToken
    });

    return { status: response.status, data: response.data };
};

interface GetClubProps {
    clubId: Club['id'];
    accessToken: string | null;
}

export const getSelectedClub = async ({ clubId, accessToken }: GetClubProps): Promise<ApiFunctionResult<Club>> => {
    const response = await request<Club>({
        route: `/clubs/${ clubId }`,
        method: 'GET',
        accessToken
    });

    return { status: response.status, data: response.data };
};