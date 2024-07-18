import {
  MutationFunction,
  QueryKey,
  UseMutationOptions,
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ErrorRes } from '../../types/api';
import { useToast } from '../useToast';
import { AxiosError } from 'axios';
import { useLogout } from '../../api/auth/mutation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useMutate = <TData = any, TVars = void>(
  fn: MutationFunction<TData, TVars>,
  options?: Omit<UseMutationOptions<TData, AxiosError<ErrorRes>, TVars>, 'mutationFn'> & {
    showError?: string | true | ((error: AxiosError<ErrorRes>, vars: TVars) => string);
    showSuccess?: string | true | ((data: TData, vars: TVars) => string);
    autoRefetch?: (data: TData, vars: TVars) => QueryKey[] | QueryKey[];
  }
): UseMutationResult<TData, AxiosError<ErrorRes>, TVars> => {
  const toast = useToast();
  const logout = useLogout();
  const queryClient = useQueryClient();
  const { autoRefetch, showError, showSuccess, ...restOptions } = options ?? {};

  return useMutation<TData, AxiosError<ErrorRes>, TVars>({
    mutationFn: fn,
    retry: 0,
    ...restOptions,

    onError(error, vars, c) {
      if (showError) {
        toast.error(
          showError === true
            ? error
            : typeof showError === 'function'
            ? showError(error, vars)
            : showError
        );
      }

      if (error.status === 401) {
        logout();
      } else {
        options?.onError?.(error, vars, c);
      }
    },
    onSuccess(data, vars, c) {
      if (showSuccess) {
        toast.success(
          showSuccess === true
            ? (data as any)
            : typeof showSuccess === 'function'
            ? showSuccess(data, vars)
            : showSuccess
        );
      }

      options?.onSuccess?.(data, vars, c);

      autoRefetch?.(data, vars)?.forEach((queryKey) => {
        queryClient.refetchQueries({ queryKey });
      });
    },
  });
};
