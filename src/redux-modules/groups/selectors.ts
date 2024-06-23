import { RootState } from '../index.ts';

const selectGroupsState = (state: RootState) => state.groups;

export const selectGroups = (state: RootState) => selectGroupsState(state).groups;