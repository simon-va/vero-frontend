import { Club } from '../../types/club.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ClubState {
    clubs: Club[];
    selectedClubId: Club['id'] | null;
}

const initialState: ClubState = {
    clubs: [],
    selectedClubId: null
};

const slice = createSlice({
    name: 'clubs',
    initialState,
    reducers: {
        setClubs(state, action: PayloadAction<Club[]>) {
            state.clubs = action.payload;
        },
        setSelectedClubId(state, action: PayloadAction<Club['id'] | null>) {
            if (action.payload) {
                localStorage.setItem('selectedClubId', action.payload.toString());
            }

            state.selectedClubId = action.payload;
        },
        setSelectedClub(state, action: PayloadAction<Club>) {
            if (state.clubs.length === 0) {
                state.clubs.push(action.payload);
            } else {
                state.clubs = state.clubs.map((club) => (club.id === action.payload.id ? action.payload : club));
            }
        }
    }
});

export const {
    setClubs,
    setSelectedClubId,
    setSelectedClub
} = slice.actions;
export const clubsReducer = slice.reducer;