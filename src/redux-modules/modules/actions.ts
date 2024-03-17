import { AppDispatch, GetAppState } from '../index.ts';
import { getModules } from '../../api/module/get.ts';
import { selectAccessToken } from '../app/selectors.ts';
import { setModules } from './slice.ts';

export const loadModules = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectAccessToken(getState());

    const { data, status } = await getModules({ accessToken });

    if (status !== 200 || !data) {
        return;
    }

    dispatch(setModules(data));
};