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

const ProfileHeader = (props: ProfileHeaderProps) => {
  const { id } = useUser();
  const { _count, ...user } = props.profile;
  const isCurrent = id === user.id;

  return (
    <Card withBorder>
      <Stack>
        <Flex align='center' justify='space-between'>
          <UserPanel avatarSize='md' user={user} withUsername />
          {isCurrent ? <EditButton /> : <FollowButton user={user} />}
        </Flex>
        <ProfileStats profile={props.profile} />
        <ProfileDesc user={user} />
      </Stack>
    </Card>
  );
};

export default ProfileHeader;
