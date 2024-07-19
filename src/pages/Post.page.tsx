import { useParams } from 'react-router-dom';
import { usePostDetails } from '../api/post/queries';
import Post from '../components/ui/Post';
import MetaTitle from '../components/ui/MetaTitle';

const PostPage = () => {
  const { id } = useParams() as { id: string };
  const { data, status, error } = usePostDetails(id);

  return (
    <>
      <MetaTitle title={data?.content?.slice(0, 20)} />
      <Post post={data!} status={status} error={error} details />
    </>
  );
};

export default PostPage;
