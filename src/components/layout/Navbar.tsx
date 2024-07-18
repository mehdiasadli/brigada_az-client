import { Anchor, Flex, Group, Stack, Text } from '@mantine/core';
import UserPanel from '../ui/UserPanel';
import { IconHome } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import LogoutButton from '../buttons/LogoutButton';

const navbarItems = [
  {
    label: 'Home',
    Icon: IconHome,
    to: '/',
  },
];

const Navbar = () => {
  return (
    <Stack h='100%'>
      <Flex align='center' justify='space-between'>
        <UserPanel />
        <LogoutButton />
      </Flex>
      <Stack mb='auto' mt={25}>
        {navbarItems.map((item) => (
          <Anchor key={item.to} component={Link} to={item.to}>
            <Group align='center'>
              <item.Icon size={20} />
              <Text>{item.label}</Text>
            </Group>
          </Anchor>
        ))}
      </Stack>
    </Stack>
  );
};

export default Navbar;
