import { Center, Group, Highlight, Menu, Stack, Text, useMantineTheme } from '@mantine/core';
import { SearchResPost } from '../../api/common/res';
import { Link } from 'react-router-dom';
import { IconTextCaption } from '@tabler/icons-react';
import { cutContent } from '../../utils/cutContent';
import dayjs from 'dayjs';

interface SearchPostItemProps {
  item: SearchResPost;
  query?: string;
}

export default function SearchPostItem({ item, query = '' }: SearchPostItemProps) {
  const {
    colors: { green },
  } = useMantineTheme();

  return (
    <Menu.Item renderRoot={(p) => <Link {...p} to={`/posts/${item.id}`} />}>
      <Group>
        <Center w={40}>
          <IconTextCaption color={green[5]} />
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
    </Menu.Item>
  );
}
