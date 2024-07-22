import { Card, Stack } from '@mantine/core';
import { IPost } from '../../types/models';
import AddComment from './AddComment';
import { usePostComments } from '../../api/comment/queries';
import Infinite from '../layout/Infinite';
import { useData } from '../../hooks/useData';
import Comment from './Comment';

interface CommentListProps {
  post: IPost;
}

export default function CommentList({ post }: CommentListProps) {
  const { data, hasNextPage, fetchNextPage, status, error } = usePostComments(post.id);
  const { Element } = useData({
    data,
    status,
    error,
    noContentLabel: 'No comments',
  });

  return (
    <Card>
      <Stack>
        <AddComment post={post} />

        {Element ?? (
          <Stack>
            <Infinite
              status={status}
              error={error}
              data={data}
              hasNext={hasNextPage}
              fetchNext={fetchNextPage}
              gap={5}
              px={5}
            >
              {({ item }) => <Comment comment={item} />}
            </Infinite>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
