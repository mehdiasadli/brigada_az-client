import { Menu } from '@mantine/core';
import UserPanel from './UserPanel';
import { forwardRef } from 'react';
import LogoutButton from '../buttons/LogoutButton';
import { IconUser } from '@tabler/icons-react';
import { useUser } from '../../hooks/useUser';
import { Link } from 'react-router-dom';

const Target = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} {...props} style={{ cursor: 'pointer' }}>
    <UserPanel withName={false} avatarSize='md' />
  </div>
));

export default function UserMenu() {
  const { username } = useUser();

  return (
    <Menu withArrow withinPortal>
      <Menu.Target>
        <Target />
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconUser size={15} />}
          component={Link}
          to={`/profile/${username}`}
        >
          Profile
        </Menu.Item>
        <LogoutButton menu />
      </Menu.Dropdown>
    </Menu>
  );
}
