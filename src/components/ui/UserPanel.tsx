import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core';
import { useUser } from '../../hooks/useUser';
import { IUser } from '../../types/models';
import UserAvatar from './UserAvatar';
import UserName from './UserName';

interface UserPanelProps extends GroupProps {
  user?: IUser;
  description?: string;
  withUsername?: boolean;
  avatarSize?: AvatarProps['size'];
  withName?: boolean;
  noAction?: boolean;
}

export default function UserPanel({
  user,
  description,
  withUsername = false,
  withName = true,
  avatarSize = 'sm',
  noAction = false,
  ...props
}: UserPanelProps) {
  const { username } = user ?? useUser();

  return (
    <Group gap={10} {...props}>
      <UserAvatar user={user} size={avatarSize} />
      {withName && (
        <Stack gap={0}>
          <UserName user={user} noAction={noAction} />
          <Text size='xs' c='dimmed'>
            {description ? description : withUsername ? `@${username}` : null}
          </Text>
        </Stack>
      )}
    </Group>
  );
}
