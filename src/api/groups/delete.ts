import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';

interface DeleteGroupProps {
    accessToken: string | null;
    clubId: number;
    groupId: number;
}

export const deleteGroup = async (
    {
        accessToken,
        clubId,
        groupId
    }: DeleteGroupProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/clubs/${ clubId }/groups/${ groupId }`,
        method: 'DELETE',
        accessToken
    });

    return { status: response.status };
};

interface DeleteMemberFromGroupProps {
    accessToken: string | null;
    clubId: number;
    groupId: number;
    memberId: number;
}

export const deleteMemberFromGroup = async (
    {
        accessToken,
        clubId,
        groupId,
        memberId
    }: DeleteMemberFromGroupProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/clubs/${ clubId }/groups/${ groupId }/members/${ memberId }`,
        method: 'DELETE',
        accessToken
    });

    return { status: response.status };
};