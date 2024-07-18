import { Flex, Stack, StackProps, Text } from '@mantine/core';
import { IPost } from '../../types/models';
import { ApiError, SuccessWithPagination } from '../../types/api';
import WithStatus from '../layout/WithStatus';
import Post from './Post';
import WithDataHandler from '../layout/WithDataHandler';
import { InfiniteData } from '@tanstack/react-query';
import Infinite from '../layout/Infinite';
import SortButton from '../buttons/SortButton';

interface PostListProps extends StackProps {
  data: InfiniteData<SuccessWithPagination<IPost>> | undefined;
  status: 'error' | 'success' | 'pending';
  error: ApiError | null;
  hasNext: boolean;
  fetchNext: () => any;
  place: 'feed' | 'profile';
}

const PostList = (props: PostListProps) => {
  const { data, hasNext, fetchNext, ...rest } = props;

  return (
    <Stack gap={0} {...rest}>
      <Flex justify='space-between' align='center'>
        {data && (
          <Text fz='xs' c='dimmed'>
            {data.pages[0].meta.total_items} Total{' '}
            {data.pages[0].meta.total_items === 1 ? 'Post' : 'Posts'}
          </Text>
        )}
        <SortButton place={props.place} />
      </Flex>
      <Infinite
        data={data}
        hasNext={hasNext}
        fetchNext={fetchNext}
        Item={({ item }) => <Post post={item} />}
      />
    </Stack>
  );
};

export default WithStatus(WithDataHandler(PostList, 'No posts found'));
