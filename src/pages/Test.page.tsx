import {
  Center,
  Combobox,
  ComboboxDropdownProps,
  ComboboxOptionProps,
  ComboboxOptionsProps,
  ComboboxProps,
  ComboboxTargetProps,
  Group,
  Highlight,
  Loader,
  Stack,
  Text,
  TextInput,
  TextInputProps,
  Title,
  UseComboboxOptions,
  useCombobox,
} from '@mantine/core';
import { IconSearch, IconTextCaption } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { ApiError } from '../types/api';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { useGlobalSearch } from '../api/common/queries';
import { useNavigate } from 'react-router-dom';
import { cutContent } from '../utils/cutContent';
import dayjs from 'dayjs';
import UserAvatar from '../components/ui/UserAvatar';

interface SearchProps<T extends { id: string }> {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  data?: T[] | undefined | null;
  isLoading: boolean;
  isFetching: boolean;
  refetch: (options?: RefetchOptions) => Promise<QueryObserverResult<T[], ApiError>>;
  children: React.FC<{ item: T }>;
  onSubmit: (value: string, optionProps: ComboboxOptionProps) => void;
  fetchAfter?: number;
  inputProps?: TextInputProps;
  targetProps?: ComboboxTargetProps;
  dropdownProps?: ComboboxDropdownProps;
  optionsProps?: ComboboxOptionsProps;
  comboboxOptions?: UseComboboxOptions;
  comboboxProps?: ComboboxProps;
}

function Search<T extends { id: string }>({
  query,
  setQuery,
  data,
  isLoading,
  isFetching,
  refetch,
  children,
  onSubmit,
  inputProps,
  targetProps,
  dropdownProps,
  optionsProps,
  comboboxOptions,
  comboboxProps,
  fetchAfter = 2,
}: SearchProps<T>) {
  const store = useCombobox({
    onDropdownClose: () => store.resetSelectedOption(),
    ...comboboxOptions,
  });
  const options = (data || []).map((item) => children({ item }));

  useEffect(() => {
    if (query.length > fetchAfter) {
      refetch();
    }
  }, [query]);

  return (
    <Combobox store={store} withinPortal={false} onOptionSubmit={onSubmit} {...comboboxProps}>
      <Combobox.Target {...targetProps}>
        <TextInput
          placeholder='Search ...'
          value={query}
          onChange={(e) => {
            setQuery(e.currentTarget.value);
            store.resetSelectedOption();
            store.openDropdown();
          }}
          onClick={() => store.openDropdown()}
          onBlur={() => store.closeDropdown()}
          onFocus={() => store.openDropdown()}
          leftSection={<IconSearch size={15} />}
          rightSection={(isLoading || isFetching) && <Loader size={18} />}
          {...inputProps}
        />
      </Combobox.Target>

      <Combobox.Dropdown hidden={!data || data.length === 0} {...dropdownProps}>
        <Combobox.Options {...optionsProps}>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default function Page() {
  const [query, setQuery] = useState('');
  const { data, isLoading, isFetching, refetch } = useGlobalSearch(query);
  const navigate = useNavigate();

  return (
    <Center h='100vh'>
      <Search
        isFetching={isFetching}
        isLoading={isLoading}
        query={query}
        setQuery={setQuery}
        refetch={refetch}
        data={data}
        onSubmit={(value) => {
          navigate(value);
        }}
      >
        {({ item }) => (
          <Combobox.Option
            value={item.type === 'POST' ? `/posts/${item.id}` : `/profile/${item.username}`}
            key={item.id}
          >
            {item.type === 'POST' ? (
              <Group>
                <Center w={40}>
                  <IconTextCaption />
                </Center>
                <Stack gap={0}>
                  <Highlight fz='sm' highlight={query}>
                    {cutContent(item.content, query, 40)}
                  </Highlight>
                  <Text c='dimmed' fz='xs'>
                    posted by {item.author.first_name} {item.author.last_name}{' '}
                    {dayjs(item.created_at).fromNow()}
                  </Text>
                </Stack>
              </Group>
            ) : (
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
            )}
          </Combobox.Option>
        )}
      </Search>
    </Center>
  );
}
