import { useMutate } from '../../hooks/react-query/useMutate';
import { useAuth } from '../../store/auth.store';
import { service } from './service';
import { LoginResponse } from './res';
import { TLoginSchema } from '../../schemas/auth.schema';
import { UseMutationResult } from '@tanstack/react-query';
import { ApiError } from '../../types/api';

export const useLogin = () => {
  const { setUser } = useAuth();

  return useMutate(service.login, {
    onSuccess(data) {
      setUser(data);
    },
    showError: true,
  }) as UseMutationResult<LoginResponse, ApiError, TLoginSchema>;
};

export const useLogout = () => {
  return useAuth().resetUser;
};
