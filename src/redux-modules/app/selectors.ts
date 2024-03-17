import { RootState } from '../index.ts';

const selectAppSlice = (state: RootState) => state.app;

export const selectSelectedContent = (state: RootState) => selectAppSlice(state).selectedContent;