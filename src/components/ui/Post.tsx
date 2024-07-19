import { Card, CardProps, Flex, LoadingOverlay, Stack, Text } from '@mantine/core';
import { IPost } from '../../types/models';
import UserPanel from './UserPanel';
import PostFooter from './PostFooter';
import dayjs from 'dayjs';
import WithStatus from '../layout/WithStatus';
import { ApiError } from '../../types/api';
import CommentList from './CommentList';
import ContentBox from './ContentBox';
import { useIsMutating } from '@tanstack/react-query';

interface PostProps extends CardProps {
  post: IPost;
  status?: 'pending' | 'error' | 'success';
  error?: ApiError | null;
  details?: boolean;
}

const Post = (props: PostProps) => {
  const { post, details = false, ...rest } = props;
  const isMutating = !!useIsMutating({ mutationKey: ['delete-post', post.id] });

  return (
    <Stack pos='relative'>
      <LoadingOverlay
        visible={isMutating}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ type: 'dots', color: 'red' }}
      />
      <Card withBorder {...rest}>
        <Stack>
          <Flex align='center' justify='space-between'>
            <UserPanel user={post.author} withUsername />
            <Text size='xs' c='dimmed'>
              Posted {dayjs(post.created_at).fromNow()}
            </Text>
          </Flex>
          <ContentBox content={post.content} />
          <PostFooter post={post} />
        </Stack>
      </Card>
      {details && <CommentList post={post} />}
    </Stack>
  );
};

export default WithStatus<PostProps>(Post);
