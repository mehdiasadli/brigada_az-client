import { Box } from '@mantine/core';
import { useFeed } from '../api/post/queries';
import PostList from '../components/ui/PostList';
import { usePostSorting } from '../store/post-sorting.store';
import { useDidUpdate } from '@mantine/hooks';

const FeedPage = () => {
  const { feed } = usePostSorting();
  const { data, status, error, hasNextPage, fetchNextPage, refetch } = useFeed({ order: feed });

  useDidUpdate(() => {
    refetch();
  }, [feed]);

  return (
    <Box pt={10} pb={30}>
      <PostList
        data={data}
        status={status}
        error={error}
        hasNext={hasNextPage}
        fetchNext={fetchNextPage}
        place='feed'
      />
    </Box>
  );
};

export default FeedPage;
