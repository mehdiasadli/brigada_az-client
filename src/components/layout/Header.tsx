import { Burger, Flex, Group } from '@mantine/core';
import CreateButton from '../buttons/CreateButton';
import GlobalSearch from '../ui/GlobalSearch';

const Header = ({ opened, toggle }: { opened: boolean; toggle: () => void }) => {
  return (
    <Flex align='center' h='100%' justify='space-between'>
      <Group align='center'>
        <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
        <GlobalSearch />
      </Group>
      <CreateButton />
    </Flex>
  );
};

export default Header;
