import { AppDispatch, GetAppState } from '../index.ts';
import { getModules } from '../../api/module/get.ts';
import { selectAccessToken } from '../app/selectors.ts';
import { setModules } from './slice.ts';
import { selectSelectedClubId } from '../clubs/selectors.ts';

export const loadModules = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const selectedClubId = selectSelectedClubId(state)!;

    const { data, status } = await getModules({ accessToken, clubId: selectedClubId });

    if (status !== 200 || !data) {
        return;
    }

    console.log(data);

    dispatch(setModules(data));
};