import { Loader, Menu, TextInput } from '@mantine/core';
import { useField } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import { useGlobalSearch } from '../../api/common/queries';
import { useDidUpdate } from '@mantine/hooks';
import React, { useEffect } from 'react';
import SearchPostItem from './SearchPostItem';
import SearchUserItem from './SearchUserItem';
import { useLocation } from 'react-router-dom';

const GlobalSearch = () => {
  const query = useField({
    initialValue: '',
  });
  const { data, isLoading, isFetching, refetch } = useGlobalSearch(query.getValue());
  const location = useLocation();

  useDidUpdate(() => {
    refetch();
  }, [query.getValue()]);

  useEffect(() => {
    query.reset();
  }, [location.pathname]);

  return (
    <Menu opened={data?.length !== 0}>
      <Menu.Target>
        <TextInput
          styles={(theme) => ({
            input: {
              boxShadow: theme.shadows.xs,
            },
          })}
          w={200}
          size='xs'
          placeholder='Search...'
          leftSection={<IconSearch size={15} />}
          rightSection={isLoading || isFetching ? <Loader size={12} /> : null}
          {...query.getInputProps()}
        />
      </Menu.Target>

      {data && data.length > 0 && (
        <Menu.Dropdown w='min(90%, 30rem)' mt={10}>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === 'POST' ? (
                <SearchPostItem item={item} query={query.getValue()} />
              ) : (
                <SearchUserItem item={item} query={query.getValue()} />
              )}
            </React.Fragment>
          ))}
        </Menu.Dropdown>
      )}
    </Menu>
  );
};

export default GlobalSearch;
