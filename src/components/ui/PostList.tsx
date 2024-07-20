import { Flex, Stack, StackProps, Text } from '@mantine/core';
import { IPost } from '../../types/models';
import { ApiError, SuccessWithPagination } from '../../types/api';
import Post from './Post';
import { InfiniteData } from '@tanstack/react-query';
import Infinite from '../layout/Infinite';
import SortButton from '../buttons/SortButton';
import { useData } from '../../hooks/useData';

interface PostListProps extends StackProps {
  data: InfiniteData<SuccessWithPagination<IPost>> | undefined;
  status: 'error' | 'success' | 'pending';
  error: ApiError | null;
  hasNext: boolean;
  fetchNext: () => any;
  place: 'feed' | 'profile';
}

const PostList = ({ data, status, error, hasNext, fetchNext, place, ...props }: PostListProps) => {
  const { Element, total } = useData({
    data,
    status,
    noContentLabel: 'No posts',
  });

  return (
    Element ?? (
      <Stack gap={0} {...props}>
        <Flex justify='space-between' align='center'>
          {data && (
            <Text fz='xs' c='dimmed'>
              {total} Total {total === 1 ? 'Post' : 'Posts'}
            </Text>
          )}
          {total !== 0 && <SortButton place={place} />}
        </Flex>
        <Infinite
          data={data}
          hasNext={hasNext}
          fetchNext={fetchNext}
          Item={({ item }) => <Post post={item} />}
        />
      </Stack>
    )
  );
};

export default PostList;
