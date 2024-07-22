import { SimpleGrid, SimpleGridProps } from '@mantine/core';
import ProfileStatCard from './ProfileStatCard';
import { IProfile } from '../../types/models';
import { modals } from '@mantine/modals';
import FollowerList from './FollowerList';
import FollowingList from './FollowingList';

interface ProfileStatsProps extends SimpleGridProps {
  profile: IProfile;
}

export default function ProfileStats({ profile, ...props }: ProfileStatsProps) {
  const openFollowerList = () =>
    modals.open({
      title: 'Followers',
      children: <FollowerList userId={profile.id} />,
    });

  const openFollowingList = () =>
    modals.open({
      title: 'Followers',
      children: <FollowingList userId={profile.id} />,
    });

  return (
    <SimpleGrid cols={3} spacing={5} {...props}>
      <ProfileStatCard data={profile._count.followed_by} label='Follower' open={openFollowerList} />
      <ProfileStatCard
        data={profile._count.following}
        label='Following'
        noPlural
        open={openFollowingList}
      />
      <ProfileStatCard data={profile._count.posts} label='Post' />
    </SimpleGrid>
  );
}
