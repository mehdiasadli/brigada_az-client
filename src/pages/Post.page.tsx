import { useParams } from 'react-router-dom';
import { usePostDetails } from '../api/post/queries';
import Post from '../components/ui/Post';
import MetaTitle from '../components/ui/MetaTitle';
import { Center, Loader, Title } from '@mantine/core';

const PostPage = () => {
  const { id } = useParams() as { id: string };
  const { data, status, error } = usePostDetails(id);

  if (status === 'pending') {
    return (
      <Center mt={10}>
        <Loader type='dots' />
      </Center>
    );
  }

  if (status === 'error') {
    return (
      <Center mt={10}>
        <Title order={6} c='red'>
          {error?.response?.data?.message || 'Error Occured'}
        </Title>
      </Center>
    );
  }

  return (
    <>
      <MetaTitle title={data?.content?.slice(0, 20)} />
      {data && <Post post={data} status={status} error={error} details />}
    </>
  );
};

export default PostPage;
