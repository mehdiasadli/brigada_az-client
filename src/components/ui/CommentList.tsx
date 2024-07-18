import { Card, Flex, ScrollArea, Stack, Text } from '@mantine/core';
import { IComment, IPost } from '../../types/models';
import AddComment from './AddComment';
import { usePostComments } from '../../api/comment/queries';
import Infinite from '../layout/Infinite';
import UserPanel from './UserPanel';
import dayjs from 'dayjs';
import ContentBox from './ContentBox';

interface CommentListProps {
  post: IPost;
}

const CommentList = (props: CommentListProps) => {
  const { data, hasNextPage, fetchNextPage, status, error } = usePostComments(props.post.id);

  return (
    <Card>
      <Stack>
        <AddComment post={props.post} />

        <Stack>
          <Infinite
            status={status}
            error={error}
            data={data}
            hasNext={hasNextPage}
            fetchNext={fetchNextPage}
            gap={5}
            px={5}
            Item={({ item }: { item: IComment }) => (
              <Card p={10} withBorder>
                <Stack gap={8}>
                  <UserPanel user={item.author} description={dayjs(item.created_at).fromNow()} />
                  <ContentBox py={5} px={5} content={item.content} />
                </Stack>
              </Card>
            )}
          />
        </Stack>
      </Stack>
    </Card>
  );
};

export default CommentList;
