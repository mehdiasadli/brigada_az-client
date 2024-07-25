import { Card, CardProps, Flex, LoadingOverlay, Stack } from '@mantine/core';
import { IPost } from '../../types/models';
import UserPanel from './UserPanel';
import PostFooter from './PostFooter';
import dayjs from 'dayjs';
import { ApiError } from '../../types/api';
import CommentList from './CommentList';
import ContentBox from './ContentBox';
import { useIsMutating } from '@tanstack/react-query';
import { useStatus } from '../../hooks/useStatus';
import PostMentions from './PostMentions';

interface PostProps extends CardProps {
  post: IPost;
  status?: 'pending' | 'error' | 'success';
  error?: ApiError | null;
  details?: boolean;
}

export default function Post({
  post,
  status = 'pending',
  error,
  details = false,
  ...props
}: PostProps) {
  const isMutating = !!useIsMutating({ mutationKey: ['delete-post', post.id] });
  const { Element } = useStatus({ status, error });

  return Element && details ? (
    Element
  ) : (
    <Stack pos='relative'>
      <LoadingOverlay
        visible={isMutating}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ type: 'dots', color: 'red' }}
      />
      <Card withBorder {...props}>
        <Stack>
          <Flex align='center' justify='space-between'>
            <UserPanel
              user={post.author}
              description={dayjs(post.created_at).fromNow()}
              extra={<PostMentions mentions={post.mentions} />}
            />
          </Flex>
          <ContentBox content={post.content} />
          <PostFooter post={post} />
        </Stack>
      </Card>
      {details && <CommentList post={post} />}
    </Stack>
  );
}
