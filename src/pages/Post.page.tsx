import { useParams } from 'react-router-dom';
import { usePostDetails } from '../api/post/queries';
import Post from '../components/ui/Post';

const PostPage = () => {
  const { id } = useParams() as { id: string };
  const { data, status, error } = usePostDetails(id);

  return <Post post={data!} status={status} error={error} details />;
};

export default PostPage;
