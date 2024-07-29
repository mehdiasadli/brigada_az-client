import { ActionIcon, Button } from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconPlus } from '@tabler/icons-react';
import CreatePostModal from '../modals/CreatePostModal';

interface CreateButtonProps {
  tab?: boolean;
}

export default function CreateButton({ tab = false }: CreateButtonProps) {
  const createPost = () =>
    modals.open({
      title: 'Create Post',
      children: <CreatePostModal />,
    });

  return tab ? (
    <ActionIcon variant='outline' size='xl' onClick={createPost} color='green'>
      <IconPlus size={14} />
    </ActionIcon>
  ) : (
    <Button
      variant='outline'
      size='xs'
      onClick={createPost}
      color='green'
      leftSection={<IconPlus size={14} />}
    >
      Create
    </Button>
  );
}
