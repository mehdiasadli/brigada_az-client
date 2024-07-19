import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../layouts/Profile.layout';
import { usePostsOfAuthor } from '../api/post/queries';
import { Box } from '@mantine/core';
import PostList from '../components/ui/PostList';
import { usePostSorting } from '../store/post-sorting.store';
import { useDidUpdate } from '@mantine/hooks';
import MetaTitle from '../components/ui/MetaTitle';

const ProfileFeedPage = () => {
  const { profile } = useOutletContext<OutletContext>();
  const { profile: sortProfile } = usePostSorting();
  const { data, status, error, hasNextPage, fetchNextPage, refetch } = usePostsOfAuthor(
    profile.id,
    {
      order: sortProfile,
    }
  );

  useDidUpdate(() => {
    refetch();
  }, [sortProfile]);

  return (
    <Box pt={10}>
      <MetaTitle title={profile.first_name + ' ' + profile.last_name} />
      <PostList
        data={data}
        status={status}
        error={error}
        hasNext={hasNextPage}
        fetchNext={fetchNextPage}
        place='profile'
      />
    </Box>
  );
};

export default ProfileFeedPage;
