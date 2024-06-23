import { Club } from '../../types/club.ts';
import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface DeleteClubProps {
    clubId: Club['id'];
    accessToken: string | null;
}

export const deleteClub = async ({ accessToken, clubId }: DeleteClubProps): Promise<ApiFunctionResult> => {
    const response = await request({
        method: 'DELETE',
        route: `/clubs/${ clubId }`,
        accessToken
    });

    return { status: response.status };
};