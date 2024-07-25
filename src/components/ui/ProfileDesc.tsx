import { Stack, Text, useMantineTheme } from '@mantine/core';
import { Flex, Group } from '@mantine/core';
import { IconCake, IconUserPlus } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { IUser } from '../../types/models';
import ContentBox from './ContentBox';

interface ProfileDescProps {
  user: IUser;
}

export default function ProfileDesc({ user }: ProfileDescProps) {
  const {
    colors: { gray },
  } = useMantineTheme();

  return (
    <Stack>
      <Flex justify='space-between'>
        <Group align='center' gap={10}>
          <IconCake size={13} color={gray[7]} />
          <Text fz='xs' c='dimmed'>
            Born on {dayjs(user.date_of_birth).format('D MMMM YYYY')}
          </Text>
        </Group>
        <Group align='center' gap={10}>
          <IconUserPlus size={13} color={gray[7]} />
          <Text fz='xs' c='dimmed'>
            Joined on {dayjs(user.created_at).format('D MMMM YYYY')}
          </Text>
        </Group>
      </Flex>
      {user.bio && <ContentBox content={user.bio} size='xs' />}
    </Stack>
  );
}
