import { getTotal } from '../utils/getTotal';
import { UseListHandlerProps, useListHandler } from './useListHandler';
import { UseStatusOptions, useStatus } from './useStatus';

interface UseDataOptions extends Omit<UseListHandlerProps, 'label'>, UseStatusOptions {
  noContentLabel?: string;
}

export const useData = ({
  data,
  status,
  containerProps,
  error,
  errorMessage,
  errorProps,
  noContentLabel,
  labelProps,
  loadingProps,
}: UseDataOptions) => {
  const { Element } = useStatus({ status, error, errorMessage, errorProps, loadingProps });
  const { show, Element: NoContent } = useListHandler({
    data,
    containerProps,
    label: noContentLabel,
    labelProps,
  });

  return {
    Element: Element ? Element : show ? NoContent : null,
    total: getTotal(data),
  };
};
