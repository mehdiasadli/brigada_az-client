import { Flex, Stack, useMantineTheme } from '@mantine/core';
import { usePostLikes } from '../../api/like/queries';
import { ILike } from '../../types/models';
import Infinite from '../layout/Infinite';
import UserPanel from '../ui/UserPanel';
import dayjs from 'dayjs';
import { IconHeartFilled } from '@tabler/icons-react';

interface LikeListModalProps {
  postId: string;
}

const LikeListModal = (props: LikeListModalProps) => {
  const { data, hasNextPage, fetchNextPage, status, error } = usePostLikes(props.postId);
  const {
    colors: { red },
  } = useMantineTheme();

  return (
    <Stack>
      <Infinite
        status={status}
        error={error}
        data={data}
        hasNext={hasNextPage}
        fetchNext={fetchNextPage}
        gap={20}
        px={5}
        Item={({ item }: { item: ILike }) => (
          <Flex align='center' justify='space-between'>
            <UserPanel user={item.user} description={dayjs(item.created_at).fromNow()} />
            <IconHeartFilled color={red[6]} size={25} />
          </Flex>
        )}
      />
    </Stack>
  );
};

export default LikeListModal;
