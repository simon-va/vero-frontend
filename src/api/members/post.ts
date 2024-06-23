import { Member } from '../../types/members.ts';
import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';

interface PostMemberProps {
    accessToken: string | null;
    clubId: number;
    payload: Pick<Member, 'firstName' | 'lastName'>;
}

export const postMember = async (
    {
        accessToken,
        clubId,
        payload
    }: PostMemberProps): Promise<ApiFunctionResult<Member>> => {
    const response = await request<Member, Pick<Member, 'firstName' | 'lastName'>>({
        route: `/clubs/${ clubId }/members`,
        method: 'POST',
        accessToken,
        body: payload
    });

    return { status: response.status, data: response.data };
};

interface PostAssignUserToMemberProps {
    accessToken: string | null;
    clubId: number;
    memberId: number;
    email: string;
}

interface RostAssignUserToMemberResponse {
    userId: number;
}

export const postAssignUserToMember = async (
    {
        accessToken,
        clubId,
        memberId,
        email
    }: PostAssignUserToMemberProps): Promise<ApiFunctionResult<RostAssignUserToMemberResponse>> => {
    const response = await request<RostAssignUserToMemberResponse, { email: string }>({
        route: `/clubs/${ clubId }/members/${ memberId }/user`,
        method: 'POST',
        accessToken,
        body: { email }
    });

    return { status: response.status, data: response.data };
};