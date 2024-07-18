import { SuccessWithPagination } from '../../types/api';
import { IFollowship } from '../../types/models';
import { QueryParams } from '../../utils/queryParser';
import { Api } from '../config';

const api = Api.create('/follow');

export const service = {
  follow: async (followingId: string) => await api.post<IFollowship>('/' + followingId),
  getFollowers: async (userId: string, query?: QueryParams) =>
    await api.get<SuccessWithPagination<IFollowship>>('/followers/' + userId, { query }),
  getFollowing: async (userId: string, query?: QueryParams) =>
    await api.get<SuccessWithPagination<IFollowship>>('/following/' + userId, { query }),
};

export const keys = {
  all: () => ['followship'] as const,
  followers: (userId: string) => [...keys.all(), 'followers', userId] as const,
  following: (userId: string) => [...keys.all(), 'following', userId] as const,
};
