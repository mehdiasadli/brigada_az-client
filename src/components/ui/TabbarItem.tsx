import { ActionIcon, Tooltip } from '@mantine/core';
import { NavItemType } from '../../lib/navitems';
import { Link } from 'react-router-dom';

interface TabbarItemProps {
  item: NavItemType;
}

export default function TabbarItem({ item }: TabbarItemProps) {
  return (
    <Tooltip label={item.label} key={item.to}>
      <ActionIcon component={Link} to={item.to} variant='subtle' size='xl'>
        <item.Icon size={20} />
      </ActionIcon>
    </Tooltip>
  );
}
