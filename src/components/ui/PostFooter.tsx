import { Flex, Group } from '@mantine/core';
import { IPost } from '../../types/models';
import LikeButton from '../buttons/LikeButton';
import CommentButton from '../buttons/CommentButton';
import PostActions from './PostActions';
import { useUser } from '../../hooks/useUser';

interface PostFooterProps {
  post: IPost;
}

export default function PostFooter({ post }: PostFooterProps) {
  const { id } = useUser();
  const isAuthor = post.authorId === id;

  return (
    <Flex align='center' justify='space-between'>
      <Group>
        <LikeButton post={post} />
        <CommentButton post={post} />
      </Group>
      {isAuthor && <PostActions post={post} />}
    </Flex>
  );
}
