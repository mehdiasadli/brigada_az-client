import { AxiosError } from 'axios';

export type ErrorRes = {
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
};

export type PaginationMeta = {
  total_items: number;
  is_last_page: boolean;
  last_page: number;
  next_page: number | null;
  prev_page: number | null;
  is_valid_page: boolean;
  total_pages: number;
  page: number;
  limit: number;
};

export type ApiError = AxiosError<ErrorRes>;

export type SuccessWithoutPagination<T> = T;
export type SuccessWithPagination<T> = {
  meta: PaginationMeta;
  data: T[];
};

export type SuccessRes<T, P extends boolean = false> = P extends true
  ? SuccessWithPagination<T>
  : SuccessWithoutPagination<T>;


export function isApiError(err: AxiosError): err is ApiError {
  if (err.response?.data && typeof err.response.data === 'object') {
    if ('message' in err.response.data) {
      return true;
    }
  }

  return false;
}
