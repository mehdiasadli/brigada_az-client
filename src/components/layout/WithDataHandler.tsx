import { Center, Text } from '@mantine/core';
import { InfiniteData } from '@tanstack/react-query';

interface WithDataHandlerProps {
  data: undefined | InfiniteData<unknown>;
}

function WithDataHandler<T extends WithDataHandlerProps>(
  Component: React.FC<T>,
  noContentLabel?: string
) {
  return function WithDataHandlerComponent(props: T) {
    if (!props.data || props.data.pages.length === 0) {
      return (
        <Center mt={5}>
          <Text c='dimmed'>{noContentLabel || 'No content'}</Text>
        </Center>
      );
    }

    return <Component {...props} />;
  };
}

export default WithDataHandler;
