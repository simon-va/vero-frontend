import { AppDispatch, GetAppState } from '../index.ts';
import { selectAccessToken } from '../app/selectors.ts';
import { getClubs } from '../../api/club/get.ts';
import { addClub, removeClub, setClubs, setSelectedClubId } from './slice.ts';
import { postModuleToClub } from '../../api/module/post.ts';
import { Module } from '../../types/module.ts';
import { selectSelectedClubId } from './selectors.ts';
import { deleteModuleFromClub } from '../../api/module/delete.ts';
import { setModuleSelected } from '../modules/slice.ts';
import { postClub } from '../../api/club/post.ts';
import { deleteClub } from '../../api/club/delete.ts';
import { resetSelectedClub } from '../app/actions.ts';
import { setRoute } from '../app/slice.ts';

export const loadClubs = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectAccessToken(getState());

    const { status, data } = await getClubs({ accessToken });

    if (status !== 200 || !data) {
        dispatch(resetSelectedClub());

        return;
    }

    const selectedClubId = localStorage.getItem('selectedClubId');

    if (selectedClubId) {
        const isInClub = data.some((club) => club.id === Number(selectedClubId));

        if (!isInClub) {
            dispatch(resetSelectedClub());
        }
    }

    dispatch(setClubs(data));
};

export const saveClubAdd = (clubName: string) => async (dispatch: AppDispatch, getState: GetAppState) => {
    const accessToken = selectAccessToken(getState());

    const { status, data } = await postClub({
        accessToken, name: clubName
    });

    if (status !== 201 || !data) {
        return;
    }

    dispatch(setSelectedClubId(data.club.id));
    dispatch(addClub(data.club));
    dispatch(setRoute('/management'));
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

    dispatch(setModuleSelected({
        id: moduleId,
        isSelected: true
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

    dispatch(setModuleSelected({
        id: moduleId,
        isSelected: false
    }));
};

export const saveClubRemove = () => async (dispatch: AppDispatch, getState: GetAppState) => {
    const state = getState();
    const accessToken = selectAccessToken(state);
    const clubId = selectSelectedClubId(state)!;

    const { status } = await deleteClub({
        accessToken, clubId
    });

    if (status !== 204) {
        return;
    }

    dispatch(setRoute('/login'));
    dispatch(resetSelectedClub());
    dispatch(removeClub(clubId));
};
