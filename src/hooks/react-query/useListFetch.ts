import { ApiError, SuccessWithPagination } from './../../types/api';
import {
  InfiniteData,
  QueryFunction,
  QueryKey,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { useLogout } from '../../api/auth/mutation';
import { useEffect } from 'react';

export const useListFetch = <T = any>(
  key: QueryKey,
  queryFn: QueryFunction<SuccessWithPagination<T>, QueryKey, number>,
  options?: Omit<
    UseInfiniteQueryOptions<
      SuccessWithPagination<T>,
      ApiError,
      InfiniteData<SuccessWithPagination<T>>,
      SuccessWithPagination<T>,
      QueryKey,
      number
    >,
    'queryKey' | 'getNextPageParam' | 'initialPageParam' | 'queryFn'
  >
) => {
  const logout = useLogout();
  const result = useInfiniteQuery<
    SuccessWithPagination<T>,
    ApiError,
    InfiniteData<SuccessWithPagination<T>, any>,
    QueryKey,
    number
  >({
    queryKey: key,
    queryFn: (props) => queryFn(props),
    initialPageParam: 1,
    retry: 0,
    getNextPageParam(page) {
      return page.meta.next_page;
    },
    ...options,
  });

  useEffect(() => {
    if (result.error?.response?.data.statusCode === 401) {
      logout();
    }
  }, [result.error?.response?.data.statusCode, logout]);

  return result as UseInfiniteQueryResult<InfiniteData<SuccessWithPagination<T>>, ApiError>;
};
