// import { useCrossDataStore } from '@/store';
import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { configure, encryptRequestInterceptor } from 'conexa-core-browser';
import { Ecommerce, getApiUrl } from './ecommerces';
import { extractAndSaveEcommerce } from './extractEcommerce';

import * as httpInterceptors from './http-interceptors';

const mainPath = '/api/v1';

async function createHttpCommon() {
  const ecommerce = extractAndSaveEcommerce();
  const baseUrl = await getApiUrl(ecommerce as Ecommerce);

  configure({
    secretKey: process.env['CRYPTOJS_SECRET_KEY']!,
    debug: true,
    env: process.env.NODE_ENV,
    securityBypass: true,
  });

  const instance = axios.create({
    baseURL: `${baseUrl}${mainPath}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'ngrok-skip-browser-warning': '69420',
    },
  });

  instance.interceptors.request.use(httpInterceptors.request);
  instance.interceptors.request.use(encryptRequestInterceptor);

  instance.interceptors.response.use(
    httpInterceptors.response.onSuccess,
    httpInterceptors.response.onFailed,
  );

  return instance;
}

const httpCommonPromise = createHttpCommon();

export class HttpService {
  basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  private async getHttp() {
    return httpCommonPromise;
  }

  async get(path: string, config?: AxiosRequestConfig) {
    const url = `${this.basePath}/${path}`;
    const http = await this.getHttp();
    return http.get(url, config);
  }

  async post(path: string, data?: any, config?: AxiosRequestConfig) {
    const url = `${this.basePath}/${path}`;
    const http = await this.getHttp();
    return http.post(url, data, config);
  }

  async put(path: string, data?: any, config?: AxiosRequestConfig) {
    const url = `${this.basePath}/${path}`;
    const http = await this.getHttp();
    return http.put(url, data, config);
  }

  async delete(path: string, config?: AxiosRequestConfig) {
    const url = `${this.basePath}/${path}`;
    const http = await this.getHttp();
    return http.delete(url, config);
  }
}
