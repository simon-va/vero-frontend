import { AppDispatch, GetAppState } from '../index.ts';
import { selectAccessToken } from '../app/selectors.ts';
import { getMembers } from '../../api/members/get.ts';
import { selectSelectedClubId } from '../clubs/selectors.ts';
import { addMember, deleteMember, setMembers, updateMember } from './slice.ts';
import { patchMember } from '../../api/members/patch.ts';
import { deleteMember } from '../../api/members/delete.ts';
import { postMember } from '../../api/members/post.ts';
import { Member } from '../../types/members.ts';

export const loadMembers = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;
    const { status, data } = await getMembers({ accessToken, clubId });

    if (status !== 200 || !data) {
        return;
    }

    dispatch(setMembers(data));
};

interface SaveMemberUpdateProps {
    memberId: number;
    payload: Record<string, string>;
}

export const saveMemberUpdate = ({ memberId, payload }: SaveMemberUpdateProps) => async (
    dispatch: AppDispatch,
    getState: GetAppState
) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status } = await patchMember({ accessToken, clubId, memberId, payload });

    if (status !== 204) {
        return;
    }

    dispatch(updateMember({
        id: memberId,
        ...payload
    }));
};

export const saveMemberDelete = (memberId: number) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status } = await deleteMember({ accessToken, clubId, memberId });

    if (status !== 204) {
        return;
    }

    dispatch(deleteMember(memberId));
};

export const saveMemberAdd = (payload: Pick<Member, 'firstName' | 'lastName'>) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status, data } = await postMember({ accessToken, clubId, payload });

    if (status !== 201 || !data) {
        return;
    }

    dispatch(addMember(data));
};