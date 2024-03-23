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
        },
        addTeam: (state, action: PayloadAction<Team>) => {
            state.teams.push(action.payload);
        },
        removeTeam: (state, action: PayloadAction<number>) => {
            state.teams = state.teams.filter(team => team.id !== action.payload);
        },
        setMemberIds: (state, action: PayloadAction<{ teamId: number, memberIds: number[] }>) => {
            const { teamId, memberIds } = action.payload;
            const team = state.teams.find(team => team.id === teamId);

            if (team) {
                team.memberIds = memberIds;
            }
        }
    }
});

export const { setMemberIds, setTeams, addTeam, removeTeam } = slice.actions;
export const teamsReducer = slice.reducer;