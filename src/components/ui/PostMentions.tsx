import { Anchor, Flex, Group, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { IMention } from '../../types/models';

interface PostMentionsProps {
  mentions?: IMention[];
}

export default function PostMentions({ mentions }: PostMentionsProps) {
  if (!mentions || mentions.length === 0) return undefined;

  return (
    <Group gap={5}>
      <Text fz={12}>with</Text>
      <Flex gap={5}>
        {mentions.map((mention, i) => (
          <>
            <Anchor fz={12} component={Link} to={`/profile/${mention.mentioned.username}`}>
              @{mention.mentioned.username}
              {i !== mentions.length - 1 && ','}
            </Anchor>
          </>
        ))}
      </Flex>
    </Group>
  );
}
