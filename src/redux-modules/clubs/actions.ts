import { AppDispatch, GetAppState } from '../index.ts';
import { selectAccessToken } from '../app/selectors.ts';
import { getClubs, getSelectedClub } from '../../api/club/get.ts';
import { setClubs, setSelectedClub } from './slice.ts';
import { Club } from '../../types/club.ts';

export const loadClubs = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectAccessToken(getState());

    const { status, data } = await getClubs({ accessToken });

    if (status !== 200 || !data) {
        return;
    }

    dispatch(setClubs(data));
};

export const loadSelectedClub = (clubId: Club['id']) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectAccessToken(getState());

    const { status, data } = await getSelectedClub({ clubId, accessToken });

    if (status !== 200 || !data) {
        return;
    }

    dispatch(setSelectedClub(data));
};