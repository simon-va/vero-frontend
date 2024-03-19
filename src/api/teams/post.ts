import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';
import { Team } from '../../types/teams.ts';

interface PostTeamProps {
    accessToken: string | null;
    clubId: number;
    payload: Pick<Team, 'name'>;
}

export const postTeam = async (
    {
        accessToken,
        clubId,
        payload
    }: PostTeamProps): Promise<ApiFunctionResult<Team>> => {
    const response = await request<Team, Pick<Team, 'name'>>({
        route: `/clubs/${ clubId }/teams`,
        method: 'POST',
        accessToken,
        body: payload
    });

    return { status: response.status, data: response.data };
};