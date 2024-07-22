import { Divider, Flex, Stack,  } from '@mantine/core';
import UserPanel from '../ui/UserPanel';
import { Icon, IconHome, IconProps } from '@tabler/icons-react';
import LogoutButton from '../buttons/LogoutButton';
import React from 'react';
import NavbarItem from '../ui/NavbarItem';

export type NavbarItemType = {
  label: string;
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  to: string;
};

interface NavbarProps {
  items?: NavbarItemType[];
  children?: React.FC<{ item: NavbarItemType }>;
}

export default function Navbar({
  items = [
    {
      label: 'Home',
      Icon: IconHome,
      to: '/',
    },
  ],
  children,
}: NavbarProps) {
  return (
    <Stack h='100%'>
      <Flex align='center' justify='space-between'>
        <UserPanel />
        <LogoutButton />
      </Flex>
      <Divider />
      <Stack mt={10} gap={10}>
        {items.map((item) =>
          children ? (
            <React.Fragment key={item.to}>{children({ item })}</React.Fragment>
          ) : (
            <NavbarItem item={item} />
          )
        )}
      </Stack>
    </Stack>
  );
}
