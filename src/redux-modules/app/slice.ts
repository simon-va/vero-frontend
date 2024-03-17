import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Route } from '../../types/app.ts';

export interface AppState {
    selectedRoute: Route;
}

const initialState = {
    selectedRoute: Route.Home
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelectedRoute: (state, action: PayloadAction<AppState['selectedRoute']>) => {
            state.selectedRoute = action.payload;
        }
    }
});

export const { setSelectedRoute } = slice.actions;
export const appReducer = slice.reducer;