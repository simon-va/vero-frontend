import { RootState } from '../index.ts';
import { selectTeams } from '../teams/selectors.ts';

const selectMembersState = (state: RootState) => state.members;

export const selectMembers = (state: RootState) => selectMembersState(state).members;

export const selectMemberByTeamId = (state: RootState, teamId: number) => {
    const team = selectTeams(state).find((team) => team.id === teamId);

    const members = selectMembers(state);

    return members.filter((member) => team?.memberIds.includes(member.id));

};
