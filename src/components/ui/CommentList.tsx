import { Card, Stack } from '@mantine/core';
import { IPost } from '../../types/models';
import AddComment from './AddComment';
import { usePostComments } from '../../api/comment/queries';
import Infinite from '../layout/Infinite';
import UserPanel from './UserPanel';
import dayjs from 'dayjs';
import ContentBox from './ContentBox';
import { useData } from '../../hooks/useData';

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
              {({ item }) => (
                <Card p={10} withBorder>
                  <Stack gap={8}>
                    <UserPanel user={item.author} description={dayjs(item.created_at).fromNow()} />
                    <ContentBox
                      sx={{ borderTopLeftRadius: 0 }}
                      
                      py={5}
                      px={5}
                      content={item.content}
                    />
                  </Stack>
                </Card>
              )}
            </Infinite>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
