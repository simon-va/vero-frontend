import { RootState } from '../index.ts';

const selectAppSlice = (state: RootState) => state.app;

export const selectSelectedRoute = (state: RootState) => selectAppSlice(state).selectedRoute;