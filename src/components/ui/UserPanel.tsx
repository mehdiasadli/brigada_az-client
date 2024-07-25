import { AvatarProps, Flex, FlexProps, Group, GroupProps, Stack, Text } from '@mantine/core';
import { useUser } from '../../hooks/useUser';
import { IUser } from '../../types/models';
import UserAvatar from './UserAvatar';
import UserName from './UserName';

interface UserPanelProps extends FlexProps {
  user?: IUser;
  description?: string;
  withUsername?: boolean;
  avatarSize?: AvatarProps['size'];
  withName?: boolean;
  noAction?: boolean;
  extra?: React.ReactNode;
}

export default function UserPanel({
  user,
  description,
  withUsername = false,
  withName = true,
  avatarSize = 'sm',
  noAction = false,
  extra,
  ...props
}: UserPanelProps) {
  const { username } = user ?? useUser();

  return (
    <Flex align='center' gap={10} {...props}>
      <UserAvatar user={user} size={avatarSize} />
      {withName && (
        <Stack gap={0}>
          <UserName user={user} title={extra} noAction={noAction} />
          <Text size='xs' c='dimmed'>
            {description ? description : withUsername ? `@${username}` : null}
          </Text>
        </Stack>
      )}
    </Flex>
  );
}
