import { Button, Menu } from '@mantine/core';
import { modals } from '@mantine/modals';
import {
  // IconCalendar,
  IconPlus,
  // IconSelect,
  IconTextCaption,
} from '@tabler/icons-react';
import CreatePostModal from '../modals/CreatePostModal';

const CreateButton = () => {
  const createPost = () =>
    modals.open({
      title: 'Create Post',
      children: <CreatePostModal />,
    });

  return (
    <Menu>
      <Menu.Target>
        <Button color='green' variant='outline' size='xs' leftSection={<IconPlus size={15} />}>
          Create
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item onClick={createPost} color='green' leftSection={<IconTextCaption size={14} />}>
          Post
        </Menu.Item>
        {/* <Menu.Item color='red' leftSection={<IconCalendar size={14} />}>
          Event
        </Menu.Item>
        <Menu.Item color='teal' leftSection={<IconSelect size={14} />}>
          Poll
        </Menu.Item> */}
      </Menu.Dropdown>
    </Menu>
  );
};

export default CreateButton;
