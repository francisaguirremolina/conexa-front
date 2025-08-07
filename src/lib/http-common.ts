// import { useCrossDataStore } from '@/store';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { configure, encryptRequestInterceptor } from 'conexa-core-browser';
import { Ecommerce, ecommerces } from './ecommerces';
import { extractAndSaveEcommerce } from './extractEcommerce';

import * as httpInterceptors from './http-interceptors';

const mainPath = '/api/v1';
let ecommerce = extractAndSaveEcommerce();
const baseUrl = ecommerces[ecommerce as Ecommerce]?.apiUrl || '';

configure({
  secretKey: process.env.CRYPTOJS_SECRET_KEY!,
  debug: true,
  env: process.env.NODE_ENV,
  securityBypass: true
});

const httpCommon = axios.create({
  baseURL: `${baseUrl}${mainPath}`,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    "ngrok-skip-browser-warning": "69420",
  },
});

// Request interceptor for adding the userId from Cookies, to query param to all requests. And extracting the token from Cookies and adding it to headers.
httpCommon.interceptors.request.use(httpInterceptors.request);
httpCommon.interceptors.request.use(encryptRequestInterceptor);

// Interceptor for return data, handle errors and shows notifications
httpCommon.interceptors.response.use(
  httpInterceptors.response.onSuccess,
  httpInterceptors.response.onFailed,
);

export class HttpService {
  basePath: string;

  http: typeof httpCommon;

  constructor(basePath: string) {
    this.basePath = basePath;
    this.http = httpCommon;
  }

  get(path: string, config?: AxiosRequestConfig) {
    const url = `${this.basePath}/${path}`;
    return this.http.get(url, config);
  }

  post(path: string, data?: any, config?: AxiosRequestConfig) {
    const url = `${this.basePath}/${path}`;
    return this.http.post(url, data, config);
  }

  put(path: string, data?: any, config?: AxiosRequestConfig) {
    const url = `${this.basePath}/${path}`;
    return this.http.put(url, data, config);
  }

  delete(path: string, config?: AxiosRequestConfig) {
    const url = `${this.basePath}/${path}`;
    return this.http.delete(url, config);
  }
}
