import { Outlet, useParams } from 'react-router-dom';
import { Stack } from '@mantine/core';
import { useProfile } from '../api/user/queries';
import { IUser } from '../types/models';
import ProfileHeader from '../components/ui/ProfileHeader';
import { useStatus } from '../hooks/useStatus';

export type OutletContext = { profile: IUser };

const ProfileLayout = () => {
  const { username } = useParams() as { username: string };
  const { data, status, error } = useProfile(username);
  const { Element } = useStatus({ status, error });

  return (
    Element ?? (
      <Stack>
        {data && <ProfileHeader profile={data} />}
        <Outlet context={{ profile: data! }} />
      </Stack>
    )
  );
};

export default ProfileLayout;
