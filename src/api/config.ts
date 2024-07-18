import axios, { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios';
import { env } from '../config/env.config';
import { getToken } from '../utils/getToken';
import { QueryParams, queryHandler, queryParser } from '../utils/queryParser';

export type ApiConfig = Omit<CreateAxiosDefaults, 'baseURL'> & { is_public?: boolean };
export type RequestConfig = AxiosRequestConfig & { query?: QueryParams };

function urlBuilder(url: string, data: { params?: QueryParams; query?: QueryParams } = {}) {
  const paramKeys = url.match(/:[a-zA-Z_-]+/g);

  if (paramKeys !== null && data.params) {
    for (const match of paramKeys) {
      const key = match.substring(1);

      if (Object.prototype.hasOwnProperty.call(data.params, key)) {
        const regex = new RegExp(match, 'g');
        url = url.replace(regex, data.params[key as keyof typeof data.params].toString());
      }
    }
  }

  if (data.query) {
    url += queryHandler(queryParser(data.query));
  }

  return url;
}

export class Api {
  public readonly base: string = env.api;
  private readonly token_type: string = 'Bearer';
  private api: AxiosInstance;

  private get token() {
    return getToken();
  }

  constructor(base: string, config?: ApiConfig) {
    const { is_public = false, ...restConfig } = config ?? {};

    const instance = axios.create({
      baseURL: this.base + base,
      ...restConfig,
    });

    if (!is_public) {
      instance.interceptors.request.use((config) => {
        config.headers.Authorization = this.token_type + ' ' + this.token;
        return config;
      });
    }

    this.api = instance;
  }

  private builder(url: string, config?: RequestConfig) {
    const { params, query, ...restConfig } = config ?? {};
    url = urlBuilder(url, { params, query });

    return {
      url,
      config: restConfig,
    };
  }

  public async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const { url: _url, config: _config } = this.builder(url, config);

    return await this.api.get(_url, _config).then((res) => res.data);
  }
  public async post<T, D = any>(url: string, data?: D, config?: RequestConfig): Promise<T> {
    const { url: _url, config: _config } = this.builder(url, config);

    return await this.api.post(_url, data ?? {}, _config).then((res: { data: T }) => res.data);
  }
  public async put<T, D = any>(url: string, data?: D, config?: RequestConfig): Promise<T> {
    const { url: _url, config: _config } = this.builder(url, config);

    return await this.api.put(_url, data ?? {}, _config).then((res: { data: T }) => res.data);
  }
  public async delete<T>(url: string, config?: RequestConfig): Promise<T> {
    const { url: _url, config: _config } = this.builder(url, config);

    return await this.api.delete(_url, _config).then((res: { data: T }) => res.data);
  }

  static create(base: string, config?: ApiConfig | undefined) {
    return new Api(base, config);
  }
}
