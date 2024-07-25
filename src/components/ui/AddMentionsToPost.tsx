import { ActionIcon, Button, Combobox } from '@mantine/core';
import { IconUserPlus, IconX } from '@tabler/icons-react';
import { useForm } from '@mantine/form';
import { TCreatePostSchema } from '../../schemas/post.schema';
import Search from './Search';
import { useState } from 'react';
import { useSearchUsers } from '../../api/user/queries';
import { useUser } from '../../hooks/useUser';

interface AddMentionsToPostProps {
  form: ReturnType<typeof useForm<TCreatePostSchema>>;
  opened: boolean;
  openAdd: () => void;
  closeAdd: () => void;
}

export default function AddMentionsToPost({
  form,
  opened,
  openAdd,
  closeAdd,
}: AddMentionsToPostProps) {
  const [query, setQuery] = useState('');
  const { data, isLoading, isFetching, refetch } = useSearchUsers(query);
  const { id } = useUser();

  const result = !data
    ? data
    : data.filter((user) => !(user.id === id || form.getValues().mentions.includes(user.username)));

  return opened ? (
    <Search
      isFetching={isFetching}
      isLoading={isLoading}
      query={query}
      setQuery={setQuery}
      refetch={refetch}
      data={result}
      inputProps={{
        placeholder: 'Search for users to tag',
        w: '100%',
        rightSection: (
          <ActionIcon color='red' variant='light' onClick={closeAdd}>
            <IconX size={15} />
          </ActionIcon>
        ),
      }}
      onSubmit={function (value, store) {
        setQuery('');
        store.closeDropdown();
        form.insertListItem('mentions', value);
      }}
    >
      {({ item }) => (
        <Combobox.Option key={item.id} value={item.username}>
          {item.first_name} {item.last_name}
        </Combobox.Option>
      )}
    </Search>
  ) : (
    <Button onClick={openAdd} size='xs' variant='light' leftSection={<IconUserPlus size={13} />}>
      Mention
    </Button>
  );
}
