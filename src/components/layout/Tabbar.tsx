import { Center, Flex } from '@mantine/core';
import { NavItemType } from '../../lib/navitems';
import React from 'react';
import TabbarItem from '../ui/TabbarItem';
import CreateButton from '../buttons/CreateButton';
import UserMenu from '../ui/UserMenu';

interface TabbarProps {
  items: NavItemType[];
  children?: React.FC<{ item: NavItemType }>;
}

export default function Tabbar({ items, children }: TabbarProps) {
  return (
    <Center hiddenFrom='sm' pos='fixed' bottom={10} left={0} right={0}>
      <Flex
        px={20}
        py={5}
        gap={15}
        justify='center'
        align='center'
        sx={(theme) => ({
          background: 'rgba( 255, 255, 255, 0.6 )',
          boxShadow: '0 8px 10px -5px rgba( 31, 38, 135, 0.37 )',
          backdropFilter: 'blur( 10.5px )',
          WebkitBackdropFilter: 'blur( 10.5px )',
          borderRadius: theme.radius.lg,
        })}
      >
        {items.map((item) =>
          children ? (
            <React.Fragment key={item.to}>{children({ item })}</React.Fragment>
          ) : (
            <TabbarItem item={item} />
          )
        )}
        <CreateButton tab />
        <UserMenu />
      </Flex>
    </Center>
  );
}
