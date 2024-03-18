import { RootState } from '../index.ts';

const selectModulesState = (state: RootState) => state.modules;

export const selectModules = (state: RootState) => selectModulesState(state).modules;

export const selectSelectedModules = (state: RootState) => selectModules(state).filter((module) => module.isSelected);