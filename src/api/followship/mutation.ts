import { useMutate } from '../../hooks/react-query/useMutate';
import { IFollowship } from '../../types/models';
import { MutationResult } from '../../types/react-query';
import { keys } from '../user/service';
import { service } from './service';

export const useFollow = () => {
  return useMutate(service.follow, {
    showError: true,
    autoRefetch: (data) => [keys.profile(data.follower.username), keys.profile(data.following.username)],
  }) as MutationResult<IFollowship>;
};
