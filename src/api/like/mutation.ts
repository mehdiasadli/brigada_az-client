import { UseMutationResult } from '@tanstack/react-query';
import { useMutate } from '../../hooks/react-query/useMutate';
import { keys, service } from './service';
import { ILike } from '../../types/models';
import { ApiError } from '../../types/api';
import { keys as postKeys } from '../post/service';

export const useLike = () => {
  return useMutate(service.like, {
    autoRefetch: (data) => [
      postKeys.feed(),
      postKeys.ofAuthor(data.userId),
      postKeys.details(data.postId),
      keys.ofPost(data.postId),
    ],
  }) as UseMutationResult<ILike, ApiError, string>;
};
