import { ApiFunctionResult } from '../../types/api.ts';
import { Module } from '../../types/module.ts';
import { request } from '../../utils/request.ts';

interface ModuleProps {
    accessToken: string | null;
    clubId: number;
}

export const getModules = async ({ accessToken, clubId }: ModuleProps): Promise<ApiFunctionResult<Module[]>> => {
    const response = await request<Module[]>({
        route: `/modules/clubs/${ clubId }`,
        method: 'GET',
        accessToken
    });

    return { status: response.status, data: response.data };
};