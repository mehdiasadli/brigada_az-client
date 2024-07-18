import { TAddCommentSchema } from '../../schemas/comment.schema';
import { SuccessWithPagination } from '../../types/api';
import { IComment, ILike } from '../../types/models';
import { QueryParams } from '../../utils/queryParser';
import { Api } from '../config';

const api = Api.create('/comments');

export const service = {
  add: async ({ postId, data }: { postId: string; data: TAddCommentSchema }) =>
    await api.post<IComment>('/' + postId, data),
  getCommentsOfPost: async (postId: string, query?: QueryParams<ILike>) =>
    await api.get<SuccessWithPagination<IComment>>('/post/' + postId, { query }),
};

export const keys = {
  all: () => ['comments'] as const,
  ofPost: (postId: string) => [...keys.all(), 'post', postId] as const,
  ofUser: (userId: string) => [...keys.all(), 'user', userId] as const,
};
