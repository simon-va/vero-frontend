import { Member } from './members.ts';

export interface Group {
    id: number;
    name: string;
    memberIds: Member['id'][];
    isSystemGroup: boolean;
}