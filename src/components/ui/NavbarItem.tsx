import { Anchor, Card, Group, Text } from '@mantine/core';
import { NavbarItemType } from '../layout/Navbar';
import { Link } from 'react-router-dom';

interface NavbarItemProps {
  item: NavbarItemType;
}

export default function NavbarItem({ item }: NavbarItemProps) {
  return (
    <Card key={item.to} component={Link} to={item.to} p={0}>
      <Anchor>
        <Group align='center'>
          <item.Icon size={20} />
          <Text>{item.label}</Text>
        </Group>
      </Anchor>
    </Card>
  );
}
