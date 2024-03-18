import { ApiFunctionResult } from '../../types/api.ts';
import { request } from '../../utils/request.ts';

interface DeleteModuleFromClubProps {
    clubId: number;
    moduleId: number;
    accessToken: string | null;
}

export const deleteModuleFromClub = async (
    {
        moduleId,
        clubId,
        accessToken
    }: DeleteModuleFromClubProps): Promise<ApiFunctionResult> => {
    const response = await request({
        route: `/modules/${ moduleId }/clubs/${ clubId }`,
        method: 'DELETE',
        accessToken
    });

    return { status: response.status };
};