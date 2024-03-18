import { RootState } from '../index.ts';

const selectAppSlice = (state: RootState) => state.app;

export const selectSelectedContent = (state: RootState) => selectAppSlice(state).selectedContent;
export const selectAccessToken = (state: RootState) => selectAppSlice(state).accessToken;
export const selectIsLoggedIn = (state: RootState) => !!selectAppSlice(state).accessToken;