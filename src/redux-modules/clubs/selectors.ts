import { RootState } from '../index.ts';

const selectClubsState = (state: RootState) => state.clubs;
export const selectClubs = (state: RootState) => selectClubsState(state).clubs;
export const selectSelectedClubId = (state: RootState) => selectClubsState(state).selectedClubId;

export const selectSelectedClub = (state: RootState) => {
    const selectedClubId = selectSelectedClubId(state);

    return selectClubs(state).find((club) => club.id === selectedClubId);
};