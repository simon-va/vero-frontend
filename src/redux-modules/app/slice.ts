import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    selectedRoute: -1
};

const slice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setSelectedRoute: (state, action: PayloadAction<number>) => {
            state.selectedRoute = action.payload;
        }
    }
});

export const { setSelectedRoute } = slice.actions;
export const appReducer = slice.reducer;