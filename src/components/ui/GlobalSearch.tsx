import { Loader, Menu, TextInput } from '@mantine/core';
import { useField } from '@mantine/form';
import { IconSearch } from '@tabler/icons-react';
import { useGlobalSearch } from '../../api/common/queries';
import { useDidUpdate } from '@mantine/hooks';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import GlobalSearchItem from './GlobalSearchItem';

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
            <GlobalSearchItem key={item.id} item={item} query={query.getValue()} />
          ))}
        </Menu.Dropdown>
      )}
    </Menu>
  );
};

export default GlobalSearch;
