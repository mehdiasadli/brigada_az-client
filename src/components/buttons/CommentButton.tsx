import { ActionIcon, Anchor, Group } from '@mantine/core';
import { IPost } from '../../types/models';
import { IconMessage } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

interface CommentButtonProps {
  post: IPost;
}

export default function CommentButton({ post }: CommentButtonProps) {
  return (
    <Group gap={5} renderRoot={(p) => <Link {...p} to={`/posts/${post.id}`} />}>
      <ActionIcon color='teal' variant='transparent'>
        <IconMessage size={16} />
      </ActionIcon>
      <Anchor component='p' size='xs' c='dimmed'>
        {post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}
      </Anchor>
    </Group>
  );
}
