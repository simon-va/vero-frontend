import { ApiFunctionResult } from '../../types/api.ts';
import { Member } from '../../types/members.ts';
import { request } from '../../utils/request.ts';

interface DeleteMemberProps {
    accessToken: string | null;
    clubId: number;
    memberId: number;
}

export const deleteMembers = async (
    {
        accessToken,
        clubId,
        memberId
    }: DeleteMemberProps): Promise<ApiFunctionResult<Member[]>> => {
    const response = await request({
        route: `/clubs/${ clubId }/members/${ memberId }`,
        method: 'DELETE',
        accessToken
    });

    return { status: response.status };
};