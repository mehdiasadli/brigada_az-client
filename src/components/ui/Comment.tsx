import { Card, CardProps, Stack } from '@mantine/core';
import UserPanel from './UserPanel';
import { IComment } from '../../types/models';
import dayjs from 'dayjs';

interface CommentProps extends CardProps {
  comment: IComment;
}

export default function Comment({ comment, ...props }: CommentProps) {
  return (
    <Card p={10} {...props}>
      <Stack gap={8}>
        <UserPanel
          user={comment.author}
          description={comment.content}
          extra={dayjs(comment.created_at).fromNow()}
        />
      </Stack>
    </Card>
  );
}
