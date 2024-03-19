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
        },
        updateMember(state, action: PayloadAction<Partial<Member>>) {
            const member = state.members.find((member) => member.id === action.payload.id);

            if (member) {
                Object.assign(member, action.payload);
            }
        },
        deleteMember(state, action: PayloadAction<number>) {
            state.members = state.members.filter((member) => member.id !== action.payload);
        }
    }
});

export const { setMembers, updateMember, deleteMember } = slice.actions;
export const membersReducer = slice.reducer;