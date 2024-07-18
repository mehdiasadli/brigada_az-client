import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../layouts/Profile.layout';
import { SegmentedControl, Stack } from '@mantine/core';
import { useState } from 'react';
import FollowerList from '../components/ui/FollowerList';
import FollowingList from '../components/ui/FollowingList';

const ProfileFriendsPage = () => {
  const { profile } = useOutletContext<OutletContext>();
  const [section, setSection] = useState('Followers');

  const View =
    section === 'Followers' ? (
      <FollowerList userId={profile.id} />
    ) : (
      <FollowingList userId={profile.id} />
    );

  return (
    <Stack>
      <SegmentedControl
        data={['Followers', 'Following']}
        value={section}
        onChange={(value) => setSection(value)}
      />
      {View}
    </Stack>
  );
};

export default ProfileFriendsPage;
