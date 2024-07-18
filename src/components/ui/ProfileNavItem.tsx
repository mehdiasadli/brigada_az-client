import { ActionIcon, Tooltip } from '@mantine/core';
import { Icon as TablerIcon, IconProps } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const ProfileNavItem = ({
  name,
  Icon,
  to,
}: {
  name: string;
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<TablerIcon>>;
  to: string;
}) => {
  return (
    <Tooltip label={name}>
      <ActionIcon size='xl' variant={'outline'} renderRoot={(props) => <Link {...props} to={to} />}>
        <Icon size={15} />
      </ActionIcon>
    </Tooltip>
  );
};

export default ProfileNavItem;
