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
        },
        setModuleSelected: (state, action: PayloadAction<{ id: number; isSelected: boolean }>) => {
            state.modules = state.modules.map((module) =>
                module.id === action.payload.id
                    ? { ...module, isSelected: action.payload.isSelected }
                    : module
            );
        }
    }
});

export const { setModules, setModuleSelected } = modulesSlice.actions;
export const modulesReducer = modulesSlice.reducer;