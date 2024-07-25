import { Textarea, TextareaProps, useMantineTheme } from '@mantine/core';

interface ContentBoxProps extends TextareaProps {
  content: string;
  inputProps?: object;
}

export default function ContentBox({ content, inputProps, ...props }: ContentBoxProps) {
  const { colors } = useMantineTheme();

  return (
    <Textarea
      value={content}
      styles={{ input: { background: colors.gray[0], border: 'none', ...inputProps } }}
      readOnly
      autosize
      {...props}
    />
  );
}
