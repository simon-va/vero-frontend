import { Member } from '../../types/members.ts';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MembersState {
    members: Member[];
}

const initialState: MembersState = {
    members: []
};

const slice = createSlice({
    name: 'members',
    initialState,
    reducers: {
        setMembers(state, action: PayloadAction<Member[]>) {
            state.members = action.payload;
        }
    }
});

export const { setMembers } = slice.actions;
export const membersReducer = slice.reducer;