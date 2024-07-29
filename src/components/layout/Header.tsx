import { Box, Flex, Group } from '@mantine/core';
import CreateButton from '../buttons/CreateButton';
import GlobalSearch from '../ui/GlobalSearch';

export default function Header() {
  return (
    <Flex align='center' h='100%' justify='space-between'>
      <Group
        align='center'
        sx={(_, u) => ({
          [u.largerThan('xs')]: {
            width: '80%',
          },
          [u.largerThan('sm')]: {
            width: 300,
          },
          width: '100%',
        })}
      >
        <GlobalSearch />
      </Group>
      <Box visibleFrom='sm'>
        <CreateButton />
      </Box>
    </Flex>
  );
}
