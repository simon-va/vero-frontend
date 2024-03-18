import { AppDispatch, GetAppState } from '../index.ts';
import { selectAccessToken } from '../app/selectors.ts';
import { getClubs, getSelectedClub } from '../../api/club/get.ts';
import { addModuleToClub, removeModuleFromClub, setClubs, setSelectedClub } from './slice.ts';
import { Club } from '../../types/club.ts';
import { postModuleToClub } from '../../api/module/post.ts';
import { Module } from '../../types/module.ts';
import { selectSelectedClubId } from './selectors.ts';
import { deleteModuleFromClub } from '../../api/module/delete.ts';

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

interface AddModuleToClubProps {
    moduleId: Module['id'];
}

export const saveModuleToClubAdd = ({ moduleId }: AddModuleToClubProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status } = await postModuleToClub({
        accessToken, clubId, moduleId
    });

    if (status !== 201) {
        return;
    }

    dispatch(addModuleToClub({
        clubId, moduleId
    }));
};

export const saveModuleFromClubDelete = ({ moduleId }: AddModuleToClubProps) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status } = await deleteModuleFromClub({
        accessToken, clubId, moduleId
    });

    if (status !== 204) {
        return;
    }

    dispatch(removeModuleFromClub({
        clubId, moduleId
    }));
};