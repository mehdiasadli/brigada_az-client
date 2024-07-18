import { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useListFetch } from '../../hooks/react-query/useListFetch';
import { keys, service } from './service';
import { ApiError, SuccessWithPagination } from '../../types/api';
import { IFollowship } from '../../types/models';

type Infinite<T, P = number> = InfiniteData<SuccessWithPagination<T>, P>;

export const useFollowers = (userId: string) => {
  return useListFetch(
    keys.followers(userId),
    ({ pageParam }) => service.getFollowers(userId, { pagination: { page: pageParam, limit: 30 } }),
    {
      enabled: !!userId,
    }
  ) as UseInfiniteQueryResult<Infinite<IFollowship>, ApiError>;
};

export const useFollowing = (userId: string) => {
  return useListFetch(
    keys.following(userId),
    ({ pageParam }) => service.getFollowing(userId, { pagination: { page: pageParam, limit: 30 } }),
    {
      enabled: !!userId,
    }
  ) as UseInfiniteQueryResult<Infinite<IFollowship>, ApiError>;
};
