import { Outlet, useParams } from 'react-router-dom';
import { Center, Group, Loader, Stack, Title } from '@mantine/core';
import { useProfile } from '../api/user/queries';
import { IUser } from '../types/models';
import ProfileHeader from '../components/ui/ProfileHeader';
import ProfileNavItem from '../components/ui/ProfileNavItem';
import { IconRss, IconUser, IconUsers } from '@tabler/icons-react';

export type OutletContext = { profile: IUser };

const ProfileLayout = () => {
  const { username } = useParams() as { username: string };
  const { data, status, error } = useProfile(username);

  if (status === 'pending') {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  if (status === 'error') {
    return (
      <Center>
        <Title c='red' order={5}>
          {error?.response?.data?.message || 'Error occured'}
        </Title>
      </Center>
    );
  }

  return (
    <Stack>
      {data && <ProfileHeader profile={data} />}
      <Group grow>
        <ProfileNavItem name='Feed' to={`/profile/${username}`} Icon={IconRss} />
        <ProfileNavItem name='About' to={`/profile/${username}/about`} Icon={IconUser} />
        <ProfileNavItem name='Friends' to={`/profile/${username}/friends`} Icon={IconUsers} />
      </Group>
      <Outlet context={{ profile: data! }} />
    </Stack>
  );
};

export default ProfileLayout;
