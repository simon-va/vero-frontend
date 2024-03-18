import { Club } from '../../types/club.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Module } from '../../types/module.ts';

export interface ClubState {
    clubs: Club[];
    selectedClubId: Club['id'] | null;
}

const initialState: ClubState = {
    clubs: [],
    selectedClubId: 1
};

interface AddModuleToClub {
    clubId: Club['id'],
    moduleId: Module['id']
}

const slice = createSlice({
    name: 'clubs',
    initialState,
    reducers: {
        setClubs(state, action: PayloadAction<Club[]>) {
            state.clubs = action.payload;
        },
        setSelectedClubId(state, action: PayloadAction<Club['id']>) {
            state.selectedClubId = action.payload;
        },
        setSelectedClub(state, action: PayloadAction<Club>) {
            if (state.clubs.length === 0) {
                state.clubs.push(action.payload);
            } else {
                state.clubs = state.clubs.map((club) => (club.id === action.payload.id ? action.payload : club));
            }
        },
        addModuleToClub(state, { payload }: PayloadAction<AddModuleToClub>) {
            const club = state.clubs.find(({ id }) => id === payload.clubId);

            club?.modules?.push(payload.moduleId);
        },
        removeModuleFromClub(state, { payload }: PayloadAction<AddModuleToClub>) {
            const club = state.clubs.find(({ id }) => id === payload.clubId);

            if (club?.modules) {
                club.modules = club?.modules?.filter((moduleId) => moduleId !== payload.moduleId);
            }

        }
    }
});

export const {
    setClubs,
    setSelectedClubId,
    setSelectedClub,
    removeModuleFromClub,
    addModuleToClub
} = slice.actions;
export const clubsReducer = slice.reducer;