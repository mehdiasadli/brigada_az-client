import { QueryKey, UseQueryOptions, UseQueryResult, useQuery } from '@tanstack/react-query';
import { ApiError } from '../../types/api';
import { useEffect } from 'react';
import { useLogout } from '../../api/auth/mutation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useFetch = <T = any>(
  key: QueryKey,
  options?: Omit<UseQueryOptions<T, ApiError>, 'queryKey'>
) => {
  const logout = useLogout();
  const result = useQuery<T, ApiError>({
    queryKey: key,
    ...options,
  });

  useEffect(() => {
    if (result.isError && result.error.response?.data?.statusCode === 401) {
      logout();
    }
  }, [result.error?.response?.data.statusCode]);

  return result as UseQueryResult<T, ApiError>;
};
