import { Team } from '../../types/teams.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface TeamState {
    teams: Team[];
}

export const initialState: TeamState = {
    teams: []
};

export const slice = createSlice({
    name: 'team',
    initialState,
    reducers: {
        setTeams: (state, action: PayloadAction<Team[]>) => {
            state.teams = action.payload;
        }
    }
});

export const { setTeams } = slice.actions;
export const teamsReducer = slice.reducer;