import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { ApiError, SuccessWithPagination } from '../../types/api';
import { useListFetch } from '../../hooks/react-query/useListFetch';
import { IComment } from '../../types/models';
import { keys, service } from './service';

type Infinite<T, P = number> = InfiniteData<SuccessWithPagination<T>, P>;

export const usePostComments = (postId: string) => {
  return useListFetch<IComment>(
    keys.ofPost(postId),
    ({ pageParam }) =>
      service.getCommentsOfPost(postId, { pagination: { page: pageParam, limit: 30 } }),
    {
      enabled: !!postId,
    }
  ) as UseInfiniteQueryResult<Infinite<IComment, number>, ApiError>;
};
