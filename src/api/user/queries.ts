import { useFetch } from '../../hooks/react-query/useFetch';
import { IProfile, IPublicUser } from '../../types/models';
import { QueryResult } from '../../types/react-query';
import { keys, service } from './service';

export const useProfile = (userId: string) => {
  return useFetch(keys.profile(userId), {
    queryFn: () => service.profile(userId),
    enabled: Boolean(userId),
  }) as QueryResult<IProfile>;
};

export const useSearchUsers = (query?: string) => {
  return useFetch(keys.search(), {
    queryFn: () => service.search(query),
    enabled: Boolean(query),
  }) as QueryResult<IPublicUser[]>;
};
