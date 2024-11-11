import { IHttpClient } from '../interfaces/http-client';

export abstract class ApiClient implements IHttpClient {
  baseURL: string;

  constructor(baseURL: string) {
    if (!baseURL.length) {
      this.baseURL = '';
      throw new Error('API URL is not defined');
    }
    this.baseURL = baseURL;
  }

  abstract getData<T, R = T>(url: string): Promise<R>;
  abstract postData<T, R = void>(url: string, body: T): Promise<R>;
  abstract patchData<T, R = void>(url: string, body: T): Promise<R>;
  abstract deleteData<T = undefined>(
    url: string,
    body?: T,
  ): Promise<void>;

  abstract handleApiError<R>(err: unknown): R;
}
