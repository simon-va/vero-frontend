import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AppState {
    selectedContent: number;
    accessToken: string;
}

const initialState = {
    selectedContent: -1,
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQGV4YW1wbGUuY29tIiwidXNlcklkIjoxLCJpYXQiOjE3MTA3MDc5MDZ9.2Zq43lJHssoMPTKxP6y0-4nADshf4VqTIHm2wpcpTt8'
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