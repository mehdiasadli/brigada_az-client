import { useAuth } from '../store/auth.store';
import { IUser } from '../types/models';

export const useUser = () => {
  return useAuth() as IUser & { token: string };
};
