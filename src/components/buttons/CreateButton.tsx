import { Button, Menu } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPlus, IconTextCaption } from '@tabler/icons-react';
import CreatePostModal from '../modals/CreatePostModal';

export default function CreateButton() {
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
      </Menu.Dropdown>
    </Menu>
  );
}
