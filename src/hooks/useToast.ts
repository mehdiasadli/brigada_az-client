import { AxiosError, AxiosResponse } from 'axios';
import { ExternalToast, toast } from 'sonner';
import { ApiError, isApiError } from '../types/api';

const DEFAULT_MESSAGES = {
  error: 'Something went wrong',
  success: 'Success',
};

export const useToast = () => {
  return {
    success: (response: string | AxiosResponse, options?: ExternalToast) => {
      let message = DEFAULT_MESSAGES.success;

      if (typeof response === 'string') {
        message = response;
      } else {
        message = response.data?.message || DEFAULT_MESSAGES.success;
      }

      toast.success(message, options);
    },
    error: (err: string | AxiosError | ApiError, options?: ExternalToast) => {
      let message = DEFAULT_MESSAGES.error;

      if (typeof err === 'string') {
        message = err;
      } else if (isApiError(err) && err.response?.data.message) {
        message = err.response.data.message;
      } else {
        message = err.message || DEFAULT_MESSAGES.error;
      }

      toast.error(message, options);
    },
    info: (message: string, options?: ExternalToast) => {
      toast.info(message, options);
    },
  };
};
