import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
    selectedContent: number;
    accessToken: string | null;
    route: string;
}

const initialState: AppState = {
    selectedContent: -1,
    accessToken: null,
    route: ''
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelectedContent: (state, action: PayloadAction<AppState['selectedContent']>) => {
            state.selectedContent = action.payload;
        },
        setAccessToken: (state, action: PayloadAction<AppState['accessToken']>) => {
            state.accessToken = action.payload;
        },
        setRoute: (state, action: PayloadAction<AppState['route']>) => {
            state.route = action.payload;
        }
    }
});

export const {
    setSelectedContent,
    setAccessToken,
    setRoute
} = slice.actions;
export const appReducer = slice.reducer;