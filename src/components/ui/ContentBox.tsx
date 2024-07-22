import { Box, BoxProps, Text, TextProps } from '@mantine/core';

interface ContentBoxProps extends BoxProps {
  content: string;
  textProps?: TextProps;
}

export default function ContentBox({
  content,
  textProps = { size: 'sm' },
  ...props
}: ContentBoxProps) {
  return (
    <Box bg='gray.0' py={8} px={12} {...props}>
      <Text size='sm' {...textProps}>
        {content}
      </Text>
    </Box>
  );
}
