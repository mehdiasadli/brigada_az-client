import { InfiniteData } from '@tanstack/react-query';
import { SuccessWithPagination } from '../types/api';
import { CenterProps, TextProps } from '@mantine/core';
import NoContent from '../components/ui/NoContent';

export interface UseListHandlerProps {
  data: InfiniteData<SuccessWithPagination<any>> | undefined;
  label?: React.ReactNode;
  containerProps?: CenterProps;
  labelProps?: TextProps;
}

export const useListHandler = ({
  data,
  label,
  containerProps,
  labelProps,
}: UseListHandlerProps) => {
  const show =
    data === undefined || data.pages.length === 0 || data.pages[0].meta.total_items === 0;
  const Element = <NoContent label={label} containerProps={containerProps} {...labelProps} />;

  return {
    show,
    Element,
  };
};
