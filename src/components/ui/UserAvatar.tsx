import { Avatar, AvatarProps } from '@mantine/core';
import { useUser } from '../../hooks/useUser';
import { IUser } from '../../types/models';
import { roler } from '../../utils/roler';

interface UserAvatarProps extends AvatarProps {
  user?: IUser;
}

export default function UserAvatar(props: UserAvatarProps) {
  const { user, size = 'sm', ...rest } = props;
  const { first_name, last_name, avatar, roles } = user ?? useUser();

  const color = roler(roles, {
    MEMBER: 'green',
    MODERATOR: 'teal',
    ADMIN: 'yellow',
  } as const);

  return (
    <Avatar color={color} name={first_name + ' ' + last_name} src={avatar} size={size} {...rest} />
  );
}
