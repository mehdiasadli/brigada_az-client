import { Button } from '@mantine/core';
import { IconUserPlus, IconUserX } from '@tabler/icons-react';
import { useFollow } from '../../api/followship/mutation';
import { IUser } from '../../types/models';
import { useUser } from '../../hooks/useUser';

const FollowButton = ({ user }: { user: IUser }) => {
  const { mutate, isPending } = useFollow();
  const { id } = useUser();
  const isFollowing = user.followed_by.some((f) => f.followerId === id);

  const onFollow = () => {
    mutate(user.id);
  };

  return (
    <Button
      color={isFollowing ? 'red' : 'green'}
      variant={isFollowing ? 'light' : 'filled'}
      leftSection={isFollowing ? <IconUserX size={15} /> : <IconUserPlus size={15} />}
      onClick={onFollow}
      loading={isPending}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </Button>
  );
};

export default FollowButton;
