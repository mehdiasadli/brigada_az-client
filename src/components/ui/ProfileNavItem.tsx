import { ActionIcon, Tooltip } from '@mantine/core';
import { Icon as TablerIcon, IconProps } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';

interface ProfileNavItemProps {
  name: string;
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<TablerIcon>>;
  to: string;
}

export default function ProfileNavItem({ name, Icon, to }: ProfileNavItemProps) {
  const { pathname } = useLocation();

  return (
    <Tooltip label={name}>
      <ActionIcon
        size='xl'
        color='teal.7'
        variant={pathname.endsWith(to) ? 'light' : 'outline'}
        renderRoot={(props) => <Link {...props} to={to} />}
      >
        <Icon size={15} />
      </ActionIcon>
    </Tooltip>
  );
}
