import { Anchor, Card, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import UserPanel from '../ui/UserPanel';
import { Icon, IconHome, IconProps } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import LogoutButton from '../buttons/LogoutButton';
import React from 'react';

type NavbarItem = {
  label: string;
  Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<Icon>>;
  to: string;
};

interface NavbarProps {
  items?: NavbarItem[];
  children?: React.FC<{ item: NavbarItem }>;
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
            <Card key={item.to} component={Link} to={item.to} shadow='xs'>
              <Anchor>
                <Group align='center'>
                  <item.Icon size={20} />
                  <Text>{item.label}</Text>
                </Group>
              </Anchor>
            </Card>
          )
        )}
      </Stack>
    </Stack>
  );
}
