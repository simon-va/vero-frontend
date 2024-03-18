import { RootState } from '../index.ts';

const selectMembersState = (state: RootState) => state.members;

export const selectMembers = (state: RootState) => selectMembersState(state).members;