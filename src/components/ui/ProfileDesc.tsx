import { Text, useMantineTheme } from '@mantine/core';
import { Flex, Group } from '@mantine/core';
import { IconCake } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { IUser } from '../../types/models';

const ProfileDesc = ({ user }: { user: IUser }) => {
  const {
    colors: { gray },
  } = useMantineTheme();

  return (
    <Flex justify='flex-end'>
      <Group align='center' gap={10}>
        <IconCake size={15} color={gray[7]} />
        <Text fz='sm' c='dimmed'>
          Joined on {dayjs(user.created_at).format('D MMMM YYYY')}
        </Text>
      </Group>
    </Flex>
  );
};

export default ProfileDesc;
