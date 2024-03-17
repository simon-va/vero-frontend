import { Module } from '../../types/module.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModulesState {
    modules: Module[];
}

const initialState: ModulesState = {
    modules: []
};

export const modulesSlice = createSlice({
    name: 'modules',
    initialState,
    reducers: {
        setModules: (state, action: PayloadAction<Module[]>) => {
            state.modules = action.payload;
        }
    }
});

export const { setModules } = modulesSlice.actions;
export const modulesReducer = modulesSlice.reducer;