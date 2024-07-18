import { useOutletContext } from 'react-router-dom';
import { OutletContext } from '../layouts/Profile.layout';
import { Stack, Text, Title } from '@mantine/core';
import ContentBox from '../components/ui/ContentBox';
import dayjs from 'dayjs';

const ProfileAboutPage = () => {
  const { profile } = useOutletContext<OutletContext>();
  const { first_name, last_name, bio, date_of_birth, email } = profile;

  return (
    <Stack mt={10}>
      <Title ta='center' order={4}>
        About {first_name} {last_name}
      </Title>
      <Stack>
        {bio && <ContentBox content={bio} />}
        {date_of_birth && <Text>Birthday: {dayjs(date_of_birth).format('D MMMM YYYY')}</Text>}
        {email && <Text>Email: {email}</Text>}
      </Stack>
    </Stack>
  );
};

export default ProfileAboutPage;
