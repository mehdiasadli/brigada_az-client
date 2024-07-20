import { useParams } from 'react-router-dom';
import { usePostDetails } from '../api/post/queries';
import Post from '../components/ui/Post';
import MetaTitle from '../components/ui/MetaTitle';
import { useStatus } from '../hooks/useStatus';

const PostPage = () => {
  const { id } = useParams() as { id: string };
  const { data, status, error } = usePostDetails(id);
  const { Element } = useStatus({ status, error });

  return (
    Element ?? (
      <>
        <MetaTitle title={data?.content?.slice(0, 20)} />
        {data && <Post post={data} status={status} error={error} details />}
      </>
    )
  );
};

export default PostPage;
