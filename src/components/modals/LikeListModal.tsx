import { Flex, Stack, useMantineTheme } from '@mantine/core';
import { usePostLikes } from '../../api/like/queries';
import { ILike } from '../../types/models';
import Infinite from '../layout/Infinite';
import UserPanel from '../ui/UserPanel';
import dayjs from 'dayjs';
import { IconHeartFilled } from '@tabler/icons-react';
import { useData } from '../../hooks/useData';

interface LikeListModalProps {
  postId: string;
}

export default function LikeListModal({ postId }: LikeListModalProps) {
  const { data, hasNextPage, fetchNextPage, status, error } = usePostLikes(postId);
  const {
    colors: { red },
  } = useMantineTheme();

  const { Element } = useData({
    data,
    status,
    error,
  });

  return (
    Element ?? (
      <Stack>
        <Infinite
          status={status}
          error={error}
          data={data}
          hasNext={hasNextPage}
          fetchNext={fetchNextPage}
          gap={20}
          px={5}
        >
          {({ item }: { item: ILike }) => (
            <Flex align='center' justify='space-between'>
              <UserPanel user={item.user} description={dayjs(item.created_at).fromNow()} />
              <IconHeartFilled color={red[6]} size={25} />
            </Flex>
          )}
        </Infinite>
      </Stack>
    )
  );
}
