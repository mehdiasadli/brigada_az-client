import { Stack, Text } from '@mantine/core';
import { useFollowers } from '../../api/followship/queries';
import Infinite from '../layout/Infinite';
import { IFollowship } from '../../types/models';
import UserPanel from './UserPanel';
import dayjs from 'dayjs';

const FollowerList = ({ userId }: { userId: string }) => {
  const { data, status, error, hasNextPage, fetchNextPage } = useFollowers(userId);

  const nodata = data?.pages[0].meta.total_items === 0;

  return (
    <Stack px={10}>
      {nodata ? (
        <Text ta='center'>No Followers</Text>
      ) : (
        <Infinite
          status={status}
          error={error}
          data={data}
          hasNext={hasNextPage}
          fetchNext={fetchNextPage}
          Item={({ item }: { item: IFollowship }) => (
            <UserPanel
              user={item.follower}
              description={'Since ' + dayjs(item.created_at).format('DD.MM.YYYY')}
            />
          )}
        />
      )}
    </Stack>
  );
};

export default FollowerList;
