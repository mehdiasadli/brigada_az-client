import { UseMutationResult } from '@tanstack/react-query';
import { useMutate } from '../../hooks/react-query/useMutate';
import { keys, service } from './service';
import { IComment } from '../../types/models';
import { ApiError } from '../../types/api';
import { keys as postKeys } from '../post/service';
import { TAddCommentSchema } from '../../schemas/comment.schema';

export const useAddComment = () => {
  return useMutate(service.add, {
    autoRefetch: (data) => [
      postKeys.feed(),
      postKeys.ofAuthor(data.authorId),
      postKeys.details(data.postId),
      keys.ofPost(data.postId),
    ],
  }) as UseMutationResult<IComment, ApiError, { postId: string; data: TAddCommentSchema }>;
};
