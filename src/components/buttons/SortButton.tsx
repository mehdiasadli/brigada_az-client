import { Button, Menu } from '@mantine/core';
import { IconSortAscending, IconSortAscending2, IconSortDescending2 } from '@tabler/icons-react';
import { usePostSorting } from '../../store/post-sorting.store';

const SortButton = ({ place = 'feed' }: { place: 'feed' | 'profile' }) => {
  const { changeOrder } = usePostSorting();

  return (
    <Menu>
      <Menu.Target>
        <Button variant='light' leftSection={<IconSortAscending size={15} />}>
          Sort
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() =>
            changeOrder(place, {
              by: 'created_at',
              dir: 'desc',
            })
          }
          leftSection={<IconSortAscending2 size={15} />}
        >
          Newest first
        </Menu.Item>
        <Menu.Item
          onClick={() =>
            changeOrder(place, {
              by: 'created_at',
              dir: 'asc',
            })
          }
          leftSection={<IconSortDescending2 size={15} />}
        >
          Oldest first
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default SortButton;
