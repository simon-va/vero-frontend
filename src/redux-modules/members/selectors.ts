import { RootState } from '../index.ts';
import { selectGroups } from '../groups/selectors.ts';

const selectMembersState = (state: RootState) => state.members;

export const selectMembers = (state: RootState) => selectMembersState(state).members;

export const selectMemberByGroupId = (state: RootState, groupId: number) => {
    const group = selectGroups(state).find((group) => group.id === groupId);

    const members = selectMembers(state);

    return members.filter((member) => group?.memberIds.includes(member.id));

};
