import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { ApiError, SuccessWithPagination } from '../../types/api';
import { useListFetch } from '../../hooks/react-query/useListFetch';
import { ILike } from '../../types/models';
import { keys, service } from './service';

type Infinite<T, P = number> = InfiniteData<SuccessWithPagination<T>, P>;

export const usePostLikes = (postId: string) => {
  return useListFetch<ILike>(
    keys.ofPost(postId),
    ({ pageParam }) =>
      service.getLikesOfPost(postId, { pagination: { page: pageParam, limit: 30 } }),
    {
      enabled: !!postId,
    }
  ) as UseInfiniteQueryResult<Infinite<ILike, number>, ApiError>;
};
