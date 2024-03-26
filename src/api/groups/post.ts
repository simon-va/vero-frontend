import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';
import { Group } from '../../types/groups.ts';

interface PostGroupProps {
    accessToken: string | null;
    clubId: number;
    payload: Pick<Group, 'name'>;
}

export const postGroup = async (
    {
        accessToken,
        clubId,
        payload
    }: PostGroupProps): Promise<ApiFunctionResult<Group>> => {
    const response = await request<Group, Pick<Group, 'name'>>({
        route: `/clubs/${ clubId }/groups`,
        method: 'POST',
        accessToken,
        body: payload
    });

    return { status: response.status, data: response.data };
};

interface PostMemberToGroupProps {
    accessToken: string | null;
    clubId: number;
    groupId: number;
    memberId: number;
}

export const postMemberToGroup = async (
    {
        accessToken,
        clubId,
        groupId,
        memberId
    }: PostMemberToGroupProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/clubs/${ clubId }/groups/${ groupId }/members/${ memberId }`,
        method: 'POST',
        accessToken
    });

    return { status: response.status };
};