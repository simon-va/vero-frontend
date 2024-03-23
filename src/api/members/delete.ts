import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';

interface DeleteMemberProps {
    accessToken: string | null;
    clubId: number;
    memberId: number;
}

export const deleteMember = async (
    {
        accessToken,
        clubId,
        memberId
    }: DeleteMemberProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/clubs/${ clubId }/members/${ memberId }`,
        method: 'DELETE',
        accessToken
    });

    return { status: response.status };
};

export const deleteUserFromMember = async (
    {
        accessToken,
        clubId,
        memberId
    }: DeleteMemberProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/clubs/${ clubId }/members/${ memberId }/user`,
        method: 'DELETE',
        accessToken
    });

    return { status: response.status };
};