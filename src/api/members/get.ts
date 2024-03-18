import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';
import { Member } from '../../types/members.ts';

interface GetMembersProps {
    accessToken: string | null;
    clubId: number;
}

export const getMembers = async ({ accessToken, clubId }: GetMembersProps): Promise<ApiFunctionResult<Member[]>> => {
    const response = await request<Member[]>({
        route: `/clubs/${ clubId }/members`,
        method: 'GET',
        accessToken
    });

    return { status: response.status, data: response.data };
};