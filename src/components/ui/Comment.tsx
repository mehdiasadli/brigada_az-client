import { Card, CardProps, Stack } from '@mantine/core';
import UserPanel from './UserPanel';
import ContentBox from './ContentBox';
import { IComment } from '../../types/models';
import dayjs from 'dayjs';

interface CommentProps extends CardProps {
  comment: IComment;
}

export default function Comment({ comment, ...props }: CommentProps) {
  return (
    <Card p={10} {...props}>
      <Stack gap={8}>
        <UserPanel user={comment.author} description={dayjs(comment.created_at).fromNow()} />
        <ContentBox sx={{ borderTopLeftRadius: 0 }} py={5} px={5} content={comment.content} />
      </Stack>
    </Card>
  );
}
