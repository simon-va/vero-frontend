import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';
import { Group } from '../../types/groups.ts';

interface GetGroupsProps {
    accessToken: string | null;
    clubId: number;
}

export const getGroups = async ({ accessToken, clubId }: GetGroupsProps): Promise<ApiFunctionResult<Group[]>> => {
    const response = await request<Group[]>({
        route: `/clubs/${ clubId }/groups`,
        method: 'GET',
        accessToken
    });

    return { status: response.status, data: response.data };
};