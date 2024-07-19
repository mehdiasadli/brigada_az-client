import { Anchor, Card, Divider, Flex, Group, Stack, Text } from '@mantine/core';
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
      <Divider />
      <Stack mt={10} gap={10}>
        {navbarItems.map((item) => (
          <Card key={item.to} component={Link} to={item.to} shadow='xs'>
            <Anchor>
              <Group align='center'>
                <item.Icon size={20} />
                <Text>{item.label}</Text>
              </Group>
            </Anchor>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
};

export default Navbar;
