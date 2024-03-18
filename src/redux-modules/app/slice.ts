import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
    selectedContent: number;
    accessToken: string | null;
}

const initialState: AppState = {
    selectedContent: -1,
    accessToken: null
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
        }
    }
});

export const { setSelectedContent, setAccessToken } = slice.actions;
export const appReducer = slice.reducer;