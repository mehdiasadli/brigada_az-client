import { TLoginSchema } from '../../schemas/auth.schema';
import { Api } from '../config';
import { LoginResponse } from './res';

const api = Api.create('/auth', { is_public: true });

export const service = {
  login: async (data: TLoginSchema) => await api.post<LoginResponse>('/login', data),
};
