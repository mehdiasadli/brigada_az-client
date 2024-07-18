import { ApiError, SuccessWithPagination } from './../../types/api';
import { useFetch } from '../../hooks/react-query/useFetch';
import { service, keys } from './service';
import { IPost } from '../../types/models';
import { QueryResult } from '../../types/react-query';
import { useListFetch } from '../../hooks/react-query/useListFetch';
import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { QueryParams } from '../../utils/queryParser';

type Infinite<T, P = number> = InfiniteData<SuccessWithPagination<T>, P>;

export const usePostsOfAuthor = (authorId: string, query?: Omit<QueryParams, 'pagination'>) => {
  return useListFetch<IPost>(
    keys.ofAuthor(authorId),
    ({ pageParam }) =>
      service.postsOfUser(authorId, { pagination: { page: pageParam, limit: 20 }, ...query }),
    {
      enabled: !!authorId,
    }
  ) as UseInfiniteQueryResult<Infinite<IPost, number>, ApiError>;
};

export const usePostDetails = (postId: string) => {
  return useFetch(keys.details(postId), {
    queryFn: () => service.postById(postId),
    enabled: !!postId,
  }) as QueryResult<IPost>;
};

export const useFeed = (query?: Omit<QueryParams, 'pagination'>) => {
  return useListFetch<IPost>(keys.feed(), ({ pageParam }) =>
    service.feed({ pagination: { page: pageParam, limit: 20 }, ...query })
  ) as UseInfiniteQueryResult<Infinite<IPost, number>, ApiError>;
};
