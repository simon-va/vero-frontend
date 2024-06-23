import { Member } from './members.ts';

export interface Club {
    id: number;
    name: string;
    modules?: number[];
}

export interface AddClubData {
    club: Club;
    member: Member;
}