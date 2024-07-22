import { ActionIcon, Menu } from '@mantine/core';
import { IPost } from '../../types/models';
import { IconDots, IconTrash } from '@tabler/icons-react';
import { useDeletePost } from '../../api/post/mutation';

interface PostActionsProps {
  post: IPost;
}

export default function PostActions({ post }: PostActionsProps) {
  const { mutate, isPending } = useDeletePost(post.id);

  return (
    <Menu disabled={isPending}>
      <Menu.Target>
        <ActionIcon variant='transparent' color='gray'>
          <IconDots size={15} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconTrash size={15} />}
          color='red'
          onClick={() => mutate(post.id)}
        >
          Delete
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
