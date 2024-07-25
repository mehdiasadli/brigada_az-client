import { useState } from 'react';
import { useSearchUsers } from '../../api/user/queries';
import Search from '../ui/Search';
import { Combobox } from '@mantine/core';

interface MentionModalProps {
  add: (username: string) => void;
}

export default function MentionModal({ add }: MentionModalProps) {
  const [query, setQuery] = useState('');
  const { data, isLoading, isFetching, refetch } = useSearchUsers(query, "mentions");

  return (
    <div>
      <Search
        isFetching={isFetching}
        isLoading={isLoading}
        query={query}
        setQuery={setQuery}
        refetch={refetch}
        data={data}
        onSubmit={function (value, store) {
          add(value);
          setQuery('');
          store.closeDropdown();
        }}
      >
        {({ item }) => (
          <Combobox.Option key={item.id} value={item.username}>
            {item.first_name} {item.last_name}
          </Combobox.Option>
        )}
      </Search>
    </div>
  );
}
