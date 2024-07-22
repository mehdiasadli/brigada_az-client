import { Button, Stack, Text } from '@mantine/core';

interface ProfileStatCardProps {
  data: number;
  label: string;
  gap?: number;
  p?: number;
  noPlural?: boolean;
  open?: () => void;
}

export default function ProfileStatCard({
  data,
  label,
  gap = 0,
  p = 5,
  noPlural = false,
  open,
}: ProfileStatCardProps) {
  label = noPlural ? label : data === 1 ? label : label + 's';

  return (
    <Button
      size='xl'
      variant='subtle'
      p={p}
      sx={(theme) => ({ boxShadow: theme.shadows.xs, cursor: open ? 'cursor' : 'default' })}
      onClick={open && open}
    >
      <Stack gap={gap} align='center'>
        <Text fw='bold'>{data}</Text>
        <Text fz='xs'>{label}</Text>
      </Stack>
    </Button>
  );
}
