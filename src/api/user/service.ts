import { TCreateUserSchema, TUpdateUserSchema } from '../../schemas/user.schema';
import { IProfile, IPublicUser } from '../../types/models';
import { Api } from '../config';

const api = Api.create('/users');

export const service = {
  create: async (data: TCreateUserSchema) => await api.post<IPublicUser>('/', data),
  update: async ({ id, data }: { id: string; data: TUpdateUserSchema }) =>
    await api.put<IPublicUser>('/' + id, data),
  profile: async (userId: string) => await api.get<IProfile>('/profile/' + userId),
  search: async (query?: string) => await api.get<IPublicUser[]>('/search', { query: { query } }),
};

export const keys = {
  all: () => ['users'] as const,
  detailsWithoutUser: () => [...keys.all(), 'details'] as const,
  profileWithoutUser: () => [...keys.detailsWithoutUser(), 'profile'] as const,
  details: (userId: string) => [...keys.all(), 'details', userId] as const,
  profile: (userId: string) => [...keys.details(userId), 'profile'] as const,
  search: () => [...keys.all(), 'search'] as const,
};
