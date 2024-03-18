import { RootState } from '../index.ts';

const selectTeamsState = (state: RootState) => state.teams;

export const selectTeams = (state: RootState) => selectTeamsState(state).teams;