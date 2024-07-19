import { Group, Text, useMantineTheme } from '@mantine/core';
import { useUser } from '../../hooks/useUser';
import { IUser } from '../../types/models';
import { roler } from '../../utils/roler';
import { IconCrown } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const UserName = ({ user, noAction = false }: { user?: IUser; noAction?: boolean }) => {
  const { first_name, last_name, roles, username } = user ?? useUser();
  const { colors } = useMantineTheme();

  const Icon = roler(roles, {
    ADMIN: IconCrown,
    MODERATOR: null,
    MEMBER: null,
  } as const);

  return noAction ? (
    <Text size='sm'>
      {first_name} {last_name} {Icon !== null ? <Icon size={15} /> : null}
    </Text>
  ) : (
    <Group gap={5}>
      <Text size='sm' component={Link} to={`/profile/${username}`}>
        {first_name} {last_name}
      </Text>
      {Icon !== null ? <Icon size={12} color={colors.yellow[6]} /> : null}
    </Group>
  );
};

export default UserName;
