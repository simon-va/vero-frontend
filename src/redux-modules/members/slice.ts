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
            state.members = action.payload.sort((a, b) => a.firstName > b.firstName ? 1 : -1);
        },
        updateMember(state, action: PayloadAction<Partial<Member>>) {
            const member = state.members.find((member) => member.id === action.payload.id);

            if (member) {
                Object.assign(member, action.payload);
            }
        },
        removeMember(state, action: PayloadAction<number>) {
            state.members = state.members.filter((member) => member.id !== action.payload);
        },
        addMember(state, action: PayloadAction<Member>) {
            state.members.push(action.payload);
        }
    }
});

export const { setMembers, updateMember, removeMember, addMember } = slice.actions;
export const membersReducer = slice.reducer;