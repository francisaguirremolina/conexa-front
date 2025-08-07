import { HttpBrowserLogger } from 'conexa-core-browser';
import Cookies from 'js-cookie';

import alerts from '@/constants/alerts';
import { useModalsStore } from '@/store';

export const request = async (config: any) => {
  const interceptedConfig = config;
  interceptedConfig.params = config.params || {};

  if (interceptedConfig.params.userId && !Cookies.get('userId')) {
    Cookies.set('userId', interceptedConfig.params.userId);
  } else if (!interceptedConfig.params.userId) {
    interceptedConfig.params.userId = Cookies.get('userId');
  }

  const token = Cookies.get('token');
  if (token) {
    interceptedConfig.headers.Authorization = `Bearer ${token}`;
  }

  return interceptedConfig;
};

export const response = {
  onSuccess: (res: any) => {
    HttpBrowserLogger.success(res);
    const { code, alertDisabled } = res.data;
    if (code && !alertDisabled && !res.config.suppressSuccessAlert) {
      useModalsStore.getState().setNotification({
        message: alerts[code] || 'Acción realizada con éxito',
        type: 'success',
      });
    }
    return res.data;
  },
  onFailed: (error: any) => {
    HttpBrowserLogger.error(error);

    const message = formatError(error);
    const filterMultiple = message.filter(Boolean).length;
    useModalsStore.getState().setNotification({
      message: message.join('\n\n'),
      length: filterMultiple,
      type: 'error',
      showTime: message.length * 4500,
    });

    return Promise.reject(error);
  },
};

const formatError = (error): string[] => {
  const unknownErrorExists = error?.response?.data?.data?.some(
    (item) => item.error === 'panel.create-shipment-uknown-error',
  );

  const message: string =
    alerts[error.response?.data?.code] ??
    (unknownErrorExists ? '' : 'Ocurrió un error inesperado. Por favor, escribinos a atencionclientes@oca.com.ar.');

  const errors: string[] =
    error.response?.data?.data
      ?.reduce((result, { error }) => {
        const exist = result.find((e) => e.error === error);

        if (!exist && alerts[error]) result.push({ error, message: alerts[error] });
        return result;
      }, [])
      ?.map(({ message }) => message) || [];

  if (!errors.length) return [message];
  return errors;
};
