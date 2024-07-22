import { Button, ButtonProps } from '@mantine/core';
import { IconUserPlus, IconUserX } from '@tabler/icons-react';
import { useFollow } from '../../api/followship/mutation';
import { IUser } from '../../types/models';
import { useUser } from '../../hooks/useUser';

interface FollowButtonProps extends ButtonProps {
  user: IUser;
  labels?: {
    follow?: string;
    unfollow?: string;
  };
}

export default function FollowButton({ user, labels = {}, ...props }: FollowButtonProps) {
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
      {...props}
    >
      {isFollowing ? `${labels.unfollow || 'Unfollow'}` : `${labels.follow || 'Follow'}`}
    </Button>
  );
}
