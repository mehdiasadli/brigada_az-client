import { Card, Flex, Stack } from '@mantine/core';
import { IProfile } from '../../types/models';
import UserPanel from './UserPanel';
import { useUser } from '../../hooks/useUser';
import EditButton from '../buttons/EditButton';
import FollowButton from '../buttons/FollowButton';
import ProfileStats from './ProfileStats';
import ProfileDesc from './ProfileDesc';

interface ProfileHeaderProps {
  profile: IProfile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const { id } = useUser();
  const { _count, ...user } = profile;
  const isCurrent = id === user.id;

  return (
    <Card withBorder>
      <Stack>
        <Flex align='center' justify='space-between'>
          <UserPanel avatarSize='md' user={user} withUsername />
          {isCurrent ? <EditButton /> : <FollowButton user={user} />}
        </Flex>
        <ProfileStats profile={profile} />
        <ProfileDesc user={user} />
      </Stack>
    </Card>
  );
}
