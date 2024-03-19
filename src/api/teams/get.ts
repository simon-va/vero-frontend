import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';
import { Team } from '../../types/teams.ts';

interface GetTeamsProps {
    accessToken: string | null;
    clubId: number;
}

export const getTeams = async ({ accessToken, clubId }: GetTeamsProps): Promise<ApiFunctionResult<Team[]>> => {
    const response = await request<Team[]>({
        route: `/clubs/${ clubId }/teams`,
        method: 'GET',
        accessToken
    });

    return { status: response.status, data: response.data };
};