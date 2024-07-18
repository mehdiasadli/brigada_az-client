import { Flex, Group } from '@mantine/core';
import { IPost } from '../../types/models';
import LikeButton from '../buttons/LikeButton';
import CommentButton from '../buttons/CommentButton';
import PostActions from './PostActions';
import { useUser } from '../../hooks/useUser';

interface PostFooterProps {
  post: IPost;
}

const PostFooter = (props: PostFooterProps) => {
  const { id } = useUser();
  const isAuthor = props.post.authorId === id;

  return (
    <Flex align='center' justify='space-between'>
      <Group>
        <LikeButton post={props.post} />
        <CommentButton post={props.post} />
      </Group>
      {isAuthor && <PostActions post={props.post} />}
    </Flex>
  );
};

export default PostFooter;
