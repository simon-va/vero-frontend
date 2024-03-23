import { AppDispatch, GetAppState } from '../index.ts';
import { selectAccessToken } from '../app/selectors.ts';
import { selectSelectedClubId } from '../clubs/selectors.ts';
import { getTeams } from '../../api/teams/get.ts';
import { addTeam, removeTeam, setMemberIds, setTeams } from './slice.ts';
import { postMemberToTeam, postTeam } from '../../api/teams/post.ts';
import { deleteMemberFromTeam, deleteTeam } from '../../api/teams/delete.ts';
import { NotificationType, showNotification } from '../notification/slice.ts';

export const loadTeams = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status, data } = await getTeams({ accessToken, clubId });

    if (status !== 200 || !data) {
        dispatch(showNotification({
            message: 'Beim Laden der Teams ist ein Fehler aufgetreten.',
            type: NotificationType.Error
        }));

        return;
    }

    dispatch(setTeams(data));
};

interface SaveTeamAddProps {
    name: string;
}

export const saveTeamAdd = ({ name }: SaveTeamAddProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status, data } = await postTeam({ accessToken, clubId, payload: { name } });

    if (status !== 201 || !data) {
        dispatch(showNotification({
            message: 'Beim Erstellen des Teams ist ein Fehler aufgetreten.',
            type: NotificationType.Error
        }));

        return;
    }

    dispatch(addTeam({
        ...data,
        memberIds: []
    }));
};

export interface SaveTeamDeleteProps {
    teamId: number;
}

export const saveTeamDelete = ({ teamId }: SaveTeamDeleteProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status } = await deleteTeam({ accessToken, clubId, teamId });

    if (status !== 204) {
        dispatch(showNotification({
            message: 'Beim Löschen des Teams ist ein Fehler aufgetreten.',
            type: NotificationType.Error
        }));

        return;
    }

    dispatch(removeTeam(teamId));
};

interface SaveMemberSelectionUpdateProps {
    teamId: number;
    prevMemberIds: number[];
    memberIds: number[];
}

export const saveMemberSelectionUpdate = (
    {
        memberIds,
        prevMemberIds,
        teamId
    }: SaveMemberSelectionUpdateProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const memberIdsToDelete = prevMemberIds.filter((id) => !memberIds.includes(id));
    const memberIdsToAdd = memberIds.filter((id) => !prevMemberIds.includes(id));

    const addPromises = memberIdsToAdd.map((memberId) => {
        return postMemberToTeam({
            accessToken: selectAccessToken(getState()),
            clubId: selectSelectedClubId(getState())!,
            teamId,
            memberId
        });
    });

    const deletePromises = memberIdsToDelete.map((memberId) => {
        return deleteMemberFromTeam({
            accessToken: selectAccessToken(getState()),
            clubId: selectSelectedClubId(getState())!,
            teamId,
            memberId
        });
    });

    await Promise.all(addPromises);
    await Promise.all(deletePromises);

    dispatch(setMemberIds({ teamId, memberIds }));
};
