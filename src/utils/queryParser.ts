type NumericString = `${number}`;
type OrderDir = 'asc' | 'desc';
type SearchType = 'contains' | 'ends' | 'starts';
type FilterOperator = 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq' | 'in' | 'nin';
type FieldArray<T extends object = any> = (keyof T)[];

export type IncomingQueryParams = {
  page?: NumericString;
  limit?: NumericString;
  order_by?: string;
  order_dir?: OrderDir;
  search_value?: string;
  search_fields?: string;
  search_type?: SearchType;
  filter_value?: string;
  filter_fields?: string;
  filter_operator?: FilterOperator;

  [key: string]: any;
};

export type QueryParams<T extends object = any> = {
  pagination?: {
    page: number; // 1
    limit?: number; // 20
  };
  order?: {
    by?: string; // created_at
    dir?: OrderDir; // "desc"
  };
  search?: {
    value: string;
    fields: FieldArray<T>;
    type?: 'contains' | 'ends' | 'starts'; // contians
  };
  filter?: {
    value: string | number | boolean;
    fields: FieldArray<T>;
    operator?: 'gt' | 'gte' | 'lt' | 'lte' | 'eq' | 'neq' | 'in' | 'nin'; // eq
  };
  [key: string]: any;
};

export function queryParser<T extends object>(query?: QueryParams<T>): IncomingQueryParams {
  const result: IncomingQueryParams = {
    order_by: query?.order?.by ?? 'created_at',
    order_dir: query?.order?.dir ?? 'desc',
  };

  if (!query) return result;

  if (query.pagination) {
    result.page = String(query.pagination.page ?? 1) as `${number}`;
    result.limit = String(query.pagination.limit ?? 20) as `${number}`;
  }

  if (query.search) {
    result.search_value = String(query.search.value);
    result.search_fields = query.search.fields.join(',');
    result.search_type = query.search.type ?? 'contains';
  }

  if (query.filter) {
    result.filter_value = String(query.filter.value);
    result.filter_fields = query.filter.fields.join(',');
    result.filter_operator = query.filter.operator ?? 'eq';
  }

  for (const key in query) {
    if (['pagination', 'search', 'filter', 'order'].includes(key)) {
      continue;
    }

    result[key] = query[key];
  }

  return result;
}

export function queryHandler(query: IncomingQueryParams): string {
  const result: string[] = [];

  for (const key in query) {
    result.push(`${key}=${query[key]}`);
  }

  return result.length ? '?' + result.join('&') : '';
}
