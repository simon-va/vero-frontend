import { AppDispatch, GetAppState } from '../index.ts';
import { selectAccessToken } from '../app/selectors.ts';
import { selectSelectedClubId } from '../clubs/selectors.ts';
import { getGroups } from '../../api/groups/get.ts';
import { addGroup, removeGroup, setMemberIds, setGroups } from './slice.ts';
import { postMemberToGroup, postGroup } from '../../api/groups/post.ts';
import { deleteMemberFromGroup, deleteGroup } from '../../api/groups/delete.ts';
import { NotificationType, showNotification } from '../notification/slice.ts';

export const loadGroups = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status, data } = await getGroups({ accessToken, clubId });

    if (status !== 200 || !data) {
        dispatch(showNotification({
            message: 'Beim Laden der Gruppen ist ein Fehler aufgetreten.',
            type: NotificationType.Error
        }));

        return;
    }

    dispatch(setGroups(data));
};

interface SaveGroupAddProps {
    name: string;
}

export const saveGroupAdd = ({ name }: SaveGroupAddProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status, data } = await postGroup({ accessToken, clubId, payload: { name } });

    if (status !== 201 || !data) {
        dispatch(showNotification({
            message: 'Beim Erstellen der Gruppe ist ein Fehler aufgetreten.',
            type: NotificationType.Error
        }));

        return;
    }

    dispatch(addGroup({
        ...data,
        memberIds: []
    }));
};

export interface SaveGroupDeleteProps {
    groupId: number;
}

export const saveGroupDelete = ({ groupId }: SaveGroupDeleteProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status } = await deleteGroup({ accessToken, clubId, groupId });

    if (status !== 204) {
        dispatch(showNotification({
            message: 'Beim Löschen der Gruppe ist ein Fehler aufgetreten.',
            type: NotificationType.Error
        }));

        return;
    }

    dispatch(removeGroup(groupId));
};

interface SaveMemberSelectionUpdateProps {
    groupId: number;
    prevMemberIds: number[];
    memberIds: number[];
}

export const saveMemberSelectionUpdate = (
    {
        memberIds,
        prevMemberIds,
        groupId
    }: SaveMemberSelectionUpdateProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const memberIdsToDelete = prevMemberIds.filter((id) => !memberIds.includes(id));
    const memberIdsToAdd = memberIds.filter((id) => !prevMemberIds.includes(id));

    const addPromises = memberIdsToAdd.map((memberId) => {
        return postMemberToGroup({
            accessToken: selectAccessToken(getState()),
            clubId: selectSelectedClubId(getState())!,
            groupId,
            memberId
        });
    });

    const deletePromises = memberIdsToDelete.map((memberId) => {
        return deleteMemberFromGroup({
            accessToken: selectAccessToken(getState()),
            clubId: selectSelectedClubId(getState())!,
            groupId,
            memberId
        });
    });

    await Promise.all(addPromises);
    await Promise.all(deletePromises);

    dispatch(setMemberIds({ groupId, memberIds }));
};
