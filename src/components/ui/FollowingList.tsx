import { Stack } from '@mantine/core';
import { useFollowing } from '../../api/followship/queries';
import Infinite from '../layout/Infinite';
import { IFollowship } from '../../types/models';
import UserPanel from './UserPanel';
import dayjs from 'dayjs';
import { useData } from '../../hooks/useData';

const FollowingList = ({ userId }: { userId: string }) => {
  const { data, status, error, hasNextPage, fetchNextPage } = useFollowing(userId);
  const { Element } = useData({
    data,
    status,
    error,
    noContentLabel: 'No following',
  });

  return (
    Element ?? (
      <Stack px={10}>
        <Infinite
          status={status}
          error={error}
          data={data}
          hasNext={hasNextPage}
          fetchNext={fetchNextPage}
          Item={({ item }: { item: IFollowship }) => (
            <UserPanel
              user={item.following}
              description={'Since ' + dayjs(item.created_at).format('DD.MM.YYYY')}
            />
          )}
        />
      </Stack>
    )
  );
};

export default FollowingList;
