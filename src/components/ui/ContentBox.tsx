import { Box, BoxProps, Text, TextProps } from '@mantine/core';

interface ContentBoxProps extends BoxProps {
  content: string;
  textProps?: TextProps;
}

const ContentBox = (props: ContentBoxProps) => {
  const { content, textProps = { size: 'sm' }, ...rest } = props;

  return (
    <Box bg='gray.0' py={8} px={12} sx={(theme) => ({ borderRadius: theme.radius.md })} {...rest}>
      <Text size='sm' {...textProps}>
        {content}
      </Text>
    </Box>
  );
};

export default ContentBox;
