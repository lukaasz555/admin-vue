import axios, { AxiosError, AxiosInstance } from 'axios';
import { ApiClient } from '../service/api-client';
import { useGlobalStore } from '../store/global.store';
import { Message } from '../models/message';
import { MessageType } from '../enums/message-type.enum';
import { LocalStorage } from '../enums/local-storage.enum';
import { useUserStore } from '../store/user.store';

export class AxiosClient extends ApiClient {
  #api: AxiosInstance;

  constructor() {
    const baseURL = `${import.meta.env.VITE_API_URL}`;
    super(baseURL);
    this.#api = axios.create({ baseURL: this.baseURL });

    this.#api.interceptors.request.use((config) => {
      const userStore = useUserStore();
      const token = localStorage.getItem(LocalStorage.STORE_TOKEN);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (userStore.user) {
        config.headers.userId = userStore.user.id;
      }

      return config;
    });
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
      console.log('postData @ err', err);
      return this.handleApiError(err);
    }
  }

  async patchData<T, R = void>(url: string, body: T): Promise<R> {
    try {
      const apiRes = await this.#api.patch<R>(url, { ...body });
      return apiRes.data;
    } catch (err) {
      return this.handleApiError(err);
    }
  }

  async deleteData<T = undefined>(
    url: string,
    body?: T,
  ): Promise<void> {
    try {
      await this.#api.delete(url, {
        ...body,
      });
    } catch (err) {
      return this.handleApiError<void>(err);
    }
  }

  handleApiError<R>(err: unknown): R {
    const globalStore = useGlobalStore();
    const errorMessage = Message.getMessage(MessageType.ERROR);

    errorMessage.content =
      err instanceof Error ? err.message : 'Something went wrong';

    if (err instanceof AxiosError) {
      errorMessage.content =
        err.response?.data?.message ?? errorMessage.content;
    }

    globalStore.addMessage(errorMessage);
    console.error(err);
    throw err;
  }
}
