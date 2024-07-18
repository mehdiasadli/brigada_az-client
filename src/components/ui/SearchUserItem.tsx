import { Center, Group, Highlight, Menu, Stack, Text, Title } from '@mantine/core';
import { SearchResUser } from '../../api/common/res';
import UserAvatar from './UserAvatar';
import { Link } from 'react-router-dom';

const SearchUserItem = ({ item, query = '' }: { item: SearchResUser; query?: string }) => {
  return (
    <Menu.Item renderRoot={(p) => <Link {...p} to={`/profile/${item.username}`} />}>
      <Group>
        <Center w={40}>
          <UserAvatar size='md' user={item} />
        </Center>
        <Stack gap={0}>
          <Title order={5}>
            <Highlight
              fz='sm'
              highlight={query}
            >{`${item.first_name} ${item.last_name}`}</Highlight>
          </Title>
          <Text component='span' c='dimmed' fz='xs'>
            <Highlight fz='xs' highlight={query}>{`@${item.username}`}</Highlight>
          </Text>
        </Stack>
      </Group>
    </Menu.Item>
  );
};

export default SearchUserItem;
