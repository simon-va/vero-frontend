import { AppDispatch, GetAppState } from '../index.ts';
import { selectAccessToken } from '../app/selectors.ts';
import { selectSelectedClubId } from '../clubs/selectors.ts';
import { getTeams } from '../../api/teams/get.ts';
import { setTeams } from './slice.ts';

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