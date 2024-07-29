import { Center, Combobox, Highlight, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import { Group } from '@mantine/core';
import UserAvatar from './UserAvatar';
import { useSearchUsers } from '../../api/user/queries';
import { IUser } from '../../types/models';

export default function GlobalSearch() {
  const [query, setQuery] = useState('');
  const { data, isLoading, isFetching, refetch } = useSearchUsers(query);
  const navigate = useNavigate();

  return (
    <Search
      isFetching={isFetching}
      isLoading={isLoading}
      query={query}
      setQuery={setQuery}
      refetch={refetch}
      data={data}
      inputProps={{
        size: 'xs',
        w: '100%',
      }}
      onSubmit={function (value, store) {
        navigate(value);
        setQuery('');
        store.closeDropdown();
      }}
    >
      {({ item }) => (
        <Combobox.Option value={`/profile/${item.username}`} key={item.id}>
          <Group>
            <Center w={40}>
              <UserAvatar size='md' user={item as IUser} color='yellow' variant='filled' />
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
        </Combobox.Option>
      )}
    </Search>
  );
}
