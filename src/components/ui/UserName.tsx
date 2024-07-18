import { Text } from '@mantine/core';
import { useUser } from '../../hooks/useUser';
import { IUser } from '../../types/models';
import { roler } from '../../utils/roler';
import { IconCrown } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const UserName = ({ user, noAction = false }: { user?: IUser; noAction?: boolean }) => {
  const { first_name, last_name, roles, username } = user ?? useUser();

  const Icon = roler(roles, {
    ADMIN: IconCrown,
    MODERATOR: IconCrown,
    MEMBER: null,
  } as const);

  return noAction ? (
    <Text size='sm'>
      {first_name} {last_name} {Icon !== null ? <Icon /> : null}
    </Text>
  ) : (
    <Text size='sm' component={Link} to={`/profile/${username}`}>
      {first_name} {last_name} {Icon !== null ? <Icon /> : null}
    </Text>
  );
};

export default UserName;
