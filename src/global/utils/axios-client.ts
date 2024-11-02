import axios, { AxiosInstance } from 'axios';
import { ApiClient } from '../service/api-client';
import { useGlobalStore } from '../store/global.store';
import { Message } from '../models/message';
import { MessageType } from '../enums/message-type.enum';

export class AxiosClient extends ApiClient {
  #api: AxiosInstance;

  constructor() {
    const baseURL = `${import.meta.env.VITE_API_URL}`;
    super(baseURL);
    this.#api = axios.create({ baseURL: this.baseURL });
  }

  async getData<T, R = T>(url: string, params?: T): Promise<R> {
    try {
      const apiRes = await this.#api.get<R>(url, { params });
      return apiRes.data;
    } catch (err) {
      return this.handleApiError(err);
    }
  }

  async postData<T, R = void>(url: string, body: T): Promise<R> {
    try {
      const apiRes = await this.#api.post<R>(url, { ...body });
      return apiRes.data;
    } catch (err) {
      return this.handleApiError(err);
    }
  }

  handleApiError<R>(err: unknown): R {
    const globalStore = useGlobalStore();
    const errorMessage = Message.getMessage(MessageType.ERROR);
    errorMessage.content =
      err instanceof Error ? err.message : 'Something went wrong';
    globalStore.addMessage(errorMessage);
    console.error(err);
    throw err;
  }
}
