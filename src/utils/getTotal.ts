import { InfiniteData } from '@tanstack/react-query';
import { SuccessWithPagination } from '../types/api';

export function getTotal(data: InfiniteData<SuccessWithPagination<any>> | undefined) {
  return data?.pages[0].meta.total_items ?? 0;
}
