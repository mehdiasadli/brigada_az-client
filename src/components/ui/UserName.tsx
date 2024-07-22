import { Group, Text, useMantineTheme } from '@mantine/core';
import { useUser } from '../../hooks/useUser';
import { IUser } from '../../types/models';
import { roler } from '../../utils/roler';
import { IconCrown } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

interface UserNameProps {
  user?: IUser;
  noAction?: boolean;
}

export default function UserName({ user, noAction = false }: UserNameProps) {
  const { first_name, last_name, roles, username } = user ?? useUser();
  const { colors } = useMantineTheme();

  const Icon = roler(roles, {
    ADMIN: IconCrown,
    MODERATOR: null,
    MEMBER: null,
  } as const);

  return (
    <Group gap={5}>
      <Text
        size={first_name.length + last_name.length > 13 ? 'xs' : 'sm'}
        renderRoot={(p) =>
          noAction ? <Text {...p} /> : <Link {...p} to={`/profile/${username}`} />
        }
      >
        {first_name} {last_name}
      </Text>
      {Icon !== null ? <Icon size={12} color={colors.yellow[6]} /> : null}
    </Group>
  );
}
