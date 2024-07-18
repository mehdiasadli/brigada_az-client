import { SimpleGrid, SimpleGridProps } from '@mantine/core';
import ProfileStatCard from './ProfileStatCard';
import { IProfile } from '../../types/models';

const ProfileStats = ({ profile, ...props }: { profile: IProfile } & SimpleGridProps) => {
  return (
    <SimpleGrid cols={3} spacing={5} {...props}>
      <ProfileStatCard data={profile._count.followed_by} label='Follower' />
      <ProfileStatCard data={profile._count.following} label='Following' noPlural />
      <ProfileStatCard data={profile._count.posts} label='Post' />
    </SimpleGrid>
  );
};

export default ProfileStats;
