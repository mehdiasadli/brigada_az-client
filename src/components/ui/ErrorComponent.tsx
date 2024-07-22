import { Alert, AlertProps, Center, CenterProps } from '@mantine/core';
import { IconExclamationCircle } from '@tabler/icons-react';

export interface ErrorComponentProps extends Omit<AlertProps, 'title'> {
  containerProps?: CenterProps;
  error?: React.ReactNode;
}

export default function ErrorComponent({
  containerProps,
  error = 'Unexpected error occured. Please try again.',
  ...props
}: ErrorComponentProps) {
  return (
    <Center {...containerProps}>
      <Alert icon={<IconExclamationCircle />} color='red' title={error} {...props} />
    </Center>
  );
}
