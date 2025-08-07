import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    suppressSuccessAlert?: boolean;
  }
}
