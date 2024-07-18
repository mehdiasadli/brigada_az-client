import { useFetch } from '../../hooks/react-query/useFetch';
import { QueryResult } from '../../types/react-query';
import { CommonSearchRes } from './res';
import { service } from './service';

export const useGlobalSearch = (query?: string) => {
  return useFetch(['search'], {
    queryFn: () => service.search(query),
    enabled: false,
  }) as QueryResult<CommonSearchRes[]>;
};
