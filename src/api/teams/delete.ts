import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';

interface DeleteTeamProps {
    accessToken: string | null;
    clubId: number;
    teamId: number;
}

export const deleteTeam = async (
    {
        accessToken,
        clubId,
        teamId
    }: DeleteTeamProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/clubs/${ clubId }/teams/${ teamId }`,
        method: 'DELETE',
        accessToken
    });

    return { status: response.status };
};