import { AppDispatch, GetAppState } from '../index.ts';
import { selectAccessToken } from '../app/selectors.ts';
import { getMembers } from '../../api/members/get.ts';
import { selectSelectedClubId } from '../clubs/selectors.ts';
import { addMember, removeMember, setMembers, updateMember } from './slice.ts';
import { patchMember } from '../../api/members/patch.ts';
import { deleteMember, deleteUserFromMember } from '../../api/members/delete.ts';
import { postAssignUserToMember, postMember } from '../../api/members/post.ts';
import { Member } from '../../types/members.ts';
import { selectMembers } from './selectors.ts';
import { removeClub } from '../clubs/slice.ts';
import { resetSelectedClub } from '../app/actions.ts';

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
    payload: Record<string, string | null | number>;
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

export const saveRemoveUserFromMember = (memberId: number) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status } = await deleteUserFromMember({ accessToken, clubId, memberId });

    if (status !== 204) {
        return;
    }

    dispatch(updateMember({
        id: memberId,
        userId: undefined
    }));
};

interface SaveAssignUserToMemberProps {
    memberId: number;
    email: string;
}

export const saveAssignUserToMember = (
    {
        memberId,
        email
    }: SaveAssignUserToMemberProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status, data } = await postAssignUserToMember({ accessToken, clubId, memberId, email });

    if (status !== 200 || !data) {
        return;
    }

    dispatch(updateMember({
        id: memberId,
        userId: data.userId
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

    const members = selectMembers(state);

    if (members.length === 1 && members[0].isAdmin) {
        // no members, so club is deleted
        dispatch(resetSelectedClub());
        dispatch(removeClub(clubId));
    }

    dispatch(removeMember(memberId));
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