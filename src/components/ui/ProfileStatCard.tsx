import { Card, Stack, Text } from '@mantine/core';

const ProfileStatCard = ({
  data,
  label,
  gap = 0,
  p = 5,
  noPlural = false,
}: {
  data: number;
  label: string;
  gap?: number;
  p?: number;
  noPlural?: boolean;
}) => {
  label = noPlural ? label : data === 1 ? label : label + 's';

  return (
    <Card withBorder p={p} shadow='xs'>
      <Stack gap={gap} align='center'>
        <Text fw='bold'>{data}</Text>
        <Text fz='xs'>{label}</Text>
      </Stack>
    </Card>
  );
};

export default ProfileStatCard;
