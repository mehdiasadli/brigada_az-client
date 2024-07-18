import { Center, Loader, Title } from '@mantine/core';
import { ApiError } from '../../types/api';

interface WithStatusProps {
  status?: 'pending' | 'error' | 'success';
  error?: ApiError | null;
  errorLabel?: string;
}

function WithStatus<T extends WithStatusProps>(Component: React.FC<T>) {
  return function WithStatusComponent(props: T) {
    if (props.status !== undefined && props.status === 'pending') {
      return (
        <Center mt={10}>
          <Loader size='sm' />
        </Center>
      );
    }

    if (props.status !== undefined && props.status === 'error') {
      return (
        <Center mt={10}>
          <Title order={6} c='red'>
            {props.error?.response?.data?.message || props.errorLabel || 'Error Occured'}
          </Title>
        </Center>
      );
    }

    return <Component {...props} />;
  };
}

export default WithStatus;
