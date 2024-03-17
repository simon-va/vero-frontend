import { ApiFunctionResult } from '../../types/api.ts';
import { Module } from '../../types/module.ts';
import { request } from '../../utils/request.ts';

interface ModuleProps {
    accessToken: string | null;
}

export const getModules = async ({ accessToken }: ModuleProps): Promise<ApiFunctionResult<Module[]>> => {
    const response = await request<Module[]>({
        route: '/modules',
        method: 'GET',
        accessToken
    });

    return { status: response.status, data: response.data };
};