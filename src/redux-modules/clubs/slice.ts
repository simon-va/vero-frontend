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
        addClub(state, action: PayloadAction<Club>) {
            state.clubs.push(action.payload);
            state.selectedClubId = action.payload.id;
        }
    }
});

export const {
    setClubs,
    setSelectedClubId,
    addClub
} = slice.actions;
export const clubsReducer = slice.reducer;