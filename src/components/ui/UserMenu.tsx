import { Menu } from '@mantine/core';
import UserPanel from './UserPanel';
import { forwardRef } from 'react';
import LogoutButton from '../buttons/LogoutButton';

const Target = forwardRef<HTMLDivElement>((props, ref) => (
  <div ref={ref} {...props} style={{ cursor: 'pointer' }}>
    <UserPanel withName={false} avatarSize={30} />
  </div>
));

export default function UserMenu() {
  return (
    <Menu withArrow withinPortal>
      <Menu.Target>
        <Target />
      </Menu.Target>

      <Menu.Dropdown>
        <LogoutButton />
      </Menu.Dropdown>
    </Menu>
  );
}
