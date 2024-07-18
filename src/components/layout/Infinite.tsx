import { InfiniteData, InfiniteQueryObserverResult } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ApiError, SuccessWithPagination } from '../../types/api';
import { Center, Loader } from '@mantine/core';
import WithStatus from './WithStatus';

interface InfiniteProps<T> {
  data?: InfiniteData<SuccessWithPagination<T>, unknown> | undefined;
  hasNext?: boolean;
  fetchNext: () => Promise<
    InfiniteQueryObserverResult<InfiniteData<SuccessWithPagination<T>, number>, ApiError>
  >;
  loader?: JSX.Element;
  status?: 'pending' | 'success' | 'error';
  error?: ApiError | null;
  noContentLabel?: string;

  style?: React.CSSProperties | undefined;
  gap?: number;
  py?: number;
  px?: number;
  dir?: 'row' | 'row-reverse' | 'column' | 'column-reverse';

  Item: React.FC<{ item: T; index: number }>;
}

const Infinite = (props: InfiniteProps<any>) => {
  const result = props.data?.pages.map((page) => page.data)?.flat();

  const styles: React.CSSProperties = {
    display: 'flex',
    flexDirection: props.dir ?? 'column',
    gap: props.gap ?? 10,
    paddingBlock: props.py ?? 10,
    paddingInline: props.px ?? 0,
    ...props.style,
  };
  const length = result?.length ?? 0;

  return (
    <InfiniteScroll
      style={styles}
      dataLength={length}
      hasMore={props.hasNext ?? false}
      next={props.fetchNext}
      scrollThreshold={'50%'}
      loader={
        props.loader ?? (
          <Center my={10}>
            <Loader type='dots' size='xs' />
          </Center>
        )
      }
    >
      {result?.map((item, i) => (
        <props.Item key={item.id} item={item} index={i} />
      ))}
    </InfiniteScroll>
  );
};

export default WithStatus(Infinite);
