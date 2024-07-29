import { Divider, Flex, Stack } from '@mantine/core';
import UserPanel from '../ui/UserPanel';
import LogoutButton from '../buttons/LogoutButton';
import React from 'react';
import NavbarItem from '../ui/NavbarItem';
import { NavItemType } from '../../lib/navitems';

interface NavbarProps {
  items: NavItemType[];
  children?: React.FC<{ item: NavItemType }>;
}

export default function Navbar({ items, children }: NavbarProps) {
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
