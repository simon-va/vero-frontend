import { Club } from '../../types/club.ts';
import { Module } from '../../types/module.ts';
import { request } from '../../utils/request.ts';
import { ApiFunctionResult } from '../../types/api.ts';

interface PostModuleToClubProps {
    accessToken: string | null;
    clubId: Club['id'];
    moduleId: Module['id'];
}

export const postModuleToClub = async (
    {
        moduleId,
        clubId,
        accessToken
    }: PostModuleToClubProps): Promise<ApiFunctionResult> => {
    const response = await request({
        method: 'POST',
        route: `/modules/${ moduleId }/clubs/${ clubId }`,
        accessToken
    });

    return { status: response.status };
};