import { Burger, Flex, Group } from '@mantine/core';
import CreateButton from '../buttons/CreateButton';
import GlobalSearch from '../ui/GlobalSearch';

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export default function Header({ opened, toggle }: HeaderProps) {
  return (
    <Flex align='center' h='100%' justify='space-between'>
      <Group align='center'>
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
        <GlobalSearch />
      </Group>
      <CreateButton />
    </Flex>
  );
}
