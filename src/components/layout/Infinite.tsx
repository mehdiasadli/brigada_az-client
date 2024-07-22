import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ApiError, SuccessWithPagination } from '../../types/api';
import { useStatus } from '../../hooks/useStatus';
import { LoadingProps } from '../ui/Loading';
import { ErrorComponentProps } from '../ui/ErrorComponent';
import React from 'react';

type FetchFn<T> = () => Promise<
  InfiniteQueryObserverResult<InfiniteData<SuccessWithPagination<T>, number>, ApiError>
>;

interface InfiniteProps<T extends { id: string }> {
  data?: InfiniteData<SuccessWithPagination<T>, unknown> | undefined;
  hasNext?: boolean;
  fetchNext: FetchFn<T>;
  loadingProps?: LoadingProps;
  errorProps?: ErrorComponentProps;
  status?: 'pending' | 'success' | 'error';
  error?: ApiError | null;
  inverse?: boolean;
  style?: React.CSSProperties | undefined;
  gap?: number;
  py?: number;
  px?: number;
  dir?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  children: React.FC<{ item: T; index: number }>;
}

export default function Infinite<T extends { id: string }>({
  fetchNext,
  data,
  dir = 'column',
  error,
  gap = 10,
  errorProps,
  hasNext,
  inverse = false,
  loadingProps,
  px = 0,
  py = 10,
  status = 'pending',
  style,
  children,
}: InfiniteProps<T>) {
  const result = data?.pages.map((page) => page.data)?.flat();
  const { ErrorElement, LoadingElement } = useStatus({
    status: status,
    error,
    loadingProps,
    errorProps,
  });

  const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: dir,
    gap: gap,
    paddingBlock: py,
    paddingInline: px,
    ...style,
  };
  const length = result?.length ?? 0;

  if (status === 'error') {
    return ErrorElement;
  }

  return (
    <InfiniteScroll
      style={styles}
      dataLength={length}
      hasMore={hasNext ?? false}
      next={fetchNext}
      scrollThreshold={'50%'}
      inverse={inverse}
      loader={LoadingElement}
    >
      {result?.map((item, i) => (
        <React.Fragment key={item.id}>{children({ item, index: i })}</React.Fragment>
      ))}
    </InfiniteScroll>
  );
}
