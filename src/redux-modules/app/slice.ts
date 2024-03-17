import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Content } from '../../types/app.ts';

export interface AppState {
    selectedContent: Content;
}

const initialState = {
    selectedContent: Content.Home
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelectedContent: (state, action: PayloadAction<AppState['selectedContent']>) => {
            state.selectedContent = action.payload;
        }
    }
});

export const { setSelectedContent } = slice.actions;
export const appReducer = slice.reducer;