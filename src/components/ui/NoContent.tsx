import { Center, CenterProps, Text, TextProps } from '@mantine/core';

interface NoContentProps extends TextProps {
  containerProps?: CenterProps;
  label?: React.ReactNode;
}

const NoContent = ({ containerProps, label = 'No content', ...props }: NoContentProps) => {
  return (
    <Center {...containerProps}>
      <Text c='dimmed' size='sm' {...props}>
        {label}
      </Text>
    </Center>
  );
};

export default NoContent;
