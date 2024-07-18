import { Api } from '../config';
import { CommonSearchRes } from './res';

const api = Api.create('/common');

export const service = {
  search: async (query?: string) =>
    await api.get<CommonSearchRes[]>('/search', { query: { query } }),
};
