import { Center, CenterProps, Loader, LoaderProps } from '@mantine/core';

export interface LoadingProps extends LoaderProps {
  containerProps?: CenterProps;
}

const Loading = ({ containerProps, ...props }: LoadingProps) => {
  return (
    <Center mt={10} {...containerProps}>
      <Loader type='dots' size='sm' {...props} />
    </Center>
  );
};

export default Loading;
