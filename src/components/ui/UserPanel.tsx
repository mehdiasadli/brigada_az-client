import { AvatarProps, Group, GroupProps, Stack, Text } from '@mantine/core';
import { useUser } from '../../hooks/useUser';
import { IUser } from '../../types/models';
import UserAvatar from './UserAvatar';
import UserName from './UserName';

const UserPanel = (
  props: GroupProps & {
    user?: IUser;
    description?: string;
    withUsername?: boolean;
    avatarSize?: AvatarProps['size'];
    withName?: boolean;
    noAction?: boolean;
  }
) => {
  const {
    user,
    description,
    withUsername = false,
    withName = true,
    avatarSize = 'sm',
    noAction = false,
    ...rest
  } = props;
  const { username } = user ?? useUser();

  return (
    <Group {...rest} gap={10}>
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
};

export default UserPanel;
