import { AppDispatch, GetAppState } from '../index.ts';
import { selectAccessToken } from '../app/selectors.ts';
import { selectSelectedClubId } from '../clubs/selectors.ts';
import { getTeams } from '../../api/teams/get.ts';
import { addTeam, removeTeam, setTeams } from './slice.ts';
import { postTeam } from '../../api/teams/post.ts';
import { deleteTeam } from '../../api/teams/delete.ts';

export const loadTeams = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status, data } = await getTeams({ accessToken, clubId });

    if (status !== 200 || !data) {
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
        return;
    }

    dispatch(removeTeam(teamId));
};