import { TCreatePostSchema } from '../../schemas/post.schema';
import { SuccessWithPagination } from '../../types/api';
import { IPost } from '../../types/models';
import { QueryParams } from '../../utils/queryParser';
import { Api } from '../config';

const api = Api.create('/posts');

export const service = {
  create: async (data: TCreatePostSchema) => await api.post<IPost>('/', data),
  delete: async (postId: string) => await api.delete('/' + postId),
  feed: async (query?: QueryParams<IPost>) =>
    await api.get<SuccessWithPagination<IPost>>('/feed', { query }),
  postsOfUser: async (authorId: string, query?: QueryParams) =>
    await api.get<SuccessWithPagination<IPost>>('/author/' + authorId, { query }),
  postById: async (postId: string) => await api.get<IPost>('/' + postId),
};

export const keys = {
  all: () => ['posts'] as const,
  feed: () => [...keys.all(), 'feed'] as const,
  ofAuthor: (authorId: string) => [...keys.all(), 'author', authorId] as const,
  details: (postId: string) => [...keys.all(), 'details', postId] as const,
  feedWithFilters: (filters: Omit<QueryParams, "pagination">) => [...keys.feed(), filters] as const,
  ofAuthorWithFilters: (authorId: string, filters: object) =>
    [...keys.ofAuthor(authorId), filters] as const,
};
