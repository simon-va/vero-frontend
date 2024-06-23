import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';

interface PatchMemberProps {
    accessToken: string | null;
    clubId: number;
    memberId: number;
    payload: Record<string, string | null | number>;
}

export const patchMember = async (
    {
        memberId, clubId, payload, accessToken
    }: PatchMemberProps): Promise<ApiFunctionResult> => {
    const response = await request({
        method: 'PATCH',
        route: `/clubs/${ clubId }/members/${ memberId }`,
        accessToken,
        body: payload
    });

    return { status: response.status };
};