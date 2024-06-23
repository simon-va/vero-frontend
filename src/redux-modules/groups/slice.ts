import { Group } from '../../types/groups.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GroupState {
    groups: Group[];
}

export const initialState: GroupState = {
    groups: []
};

export const slice = createSlice({
    name: 'groups',
    initialState,
    reducers: {
        setGroups: (state, action: PayloadAction<Group[]>) => {
            state.groups = action.payload;
        },
        addGroup: (state, action: PayloadAction<Group>) => {
            state.groups.push(action.payload);
        },
        removeGroup: (state, action: PayloadAction<number>) => {
            state.groups = state.groups.filter(group => group.id !== action.payload);
        },
        setMemberIds: (state, action: PayloadAction<{ groupId: number, memberIds: number[] }>) => {
            const { groupId, memberIds } = action.payload;
            const group = state.groups.find(({ id }) => id === groupId);

            if (group) {
                group.memberIds = memberIds;
            }
        }
    }
});

export const { setMemberIds, addGroup, setGroups, removeGroup } = slice.actions;
export const groupsReducer = slice.reducer;