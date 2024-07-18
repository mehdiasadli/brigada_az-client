import { SuccessWithPagination } from '../../types/api';
import { ILike } from '../../types/models';
import { QueryParams } from '../../utils/queryParser';
import { Api } from '../config';

const api = Api.create('/likes');

export const service = {
  like: async (postId: string) => await api.post<ILike>('/' + postId),
  getLikesOfPost: async (postId: string, query?: QueryParams<ILike>) =>
    await api.get<SuccessWithPagination<ILike>>('/post/' + postId, { query }),
};

export const keys = {
  all: () => ['likes'] as const,
  ofPost: (postId: string) => [...keys.all(), 'post', postId] as const,
  ofUser: (userId: string) => [...keys.all(), 'user', userId] as const,
};
