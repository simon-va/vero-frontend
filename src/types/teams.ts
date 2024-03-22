import { Member } from './members.ts';

export interface Team {
    id: number;
    name: string;
    memberIds: Member['id'][];
    isSystemTeam: boolean;
}