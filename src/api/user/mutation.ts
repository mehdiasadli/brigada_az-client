import { useLogout } from './../auth/mutation';
import { useMutate } from '../../hooks/react-query/useMutate';
import { service } from './service';
import { UseMutationResult } from '@tanstack/react-query';
import { ApiError } from '../../types/api';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../hooks/useToast';
import { IPublicUser } from '../../types/models';
import { TCreateUserSchema } from '../../schemas/user.schema';
import { useAuth } from '../../store/auth.store';
import { modals } from '@mantine/modals';

export const useRegister = () => {
  const navigate = useNavigate();
  const toast = useToast();

  return useMutate(service.create, {
    onSuccess(data) {
      navigate('/auth');
      toast.success(`Mr. ${data.first_name} ${data.last_name}, your account has been created`);
    },
    showError: true,
  }) as UseMutationResult<IPublicUser, ApiError, TCreateUserSchema>;
};

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  return useMutate(service.update, {
    showError: true,
    onSuccess(data) {
      updateUser(data);
      navigate(`/profile/${data.username}`);
    },
  });
};

export const useChangePassword = () => {
  const logout = useLogout();

  return useMutate(service.changePassword, {
    showError: true,
    showSuccess: 'You must login again with your new password',
    onSuccess: () => {
      modals.closeAll();
      logout();
    },
  });
};
