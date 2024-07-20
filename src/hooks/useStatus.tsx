import ErrorComponent, { ErrorComponentProps } from '../components/ui/ErrorComponent';
import Loading, { LoadingProps } from '../components/ui/Loading';
import { ApiError } from '../types/api';

interface UseStatusReturn {
  LoadingElement: JSX.Element;
  ErrorElement: JSX.Element;
  Element: JSX.Element;
}

export interface UseStatusOptions {
  status: 'error' | 'pending' | 'success';
  error?: ApiError | null;
  errorMessage?: React.ReactNode;

  loadingProps?: LoadingProps;
  errorProps?: ErrorComponentProps;
}

export const useStatus = ({
  status,
  error,
  errorMessage,
  loadingProps,
  errorProps,
}: UseStatusOptions) => {
  const LoadingElement = <Loading {...loadingProps} />;
  const ErrorElement = (
    <ErrorComponent error={error?.response?.data?.message || errorMessage} {...errorProps} />
  );

  const Element = status === 'pending' ? LoadingElement : status === 'error' ? ErrorElement : null;

  return {
    Element: Element,
    LoadingElement,
    ErrorElement,
  } as UseStatusReturn;
};
