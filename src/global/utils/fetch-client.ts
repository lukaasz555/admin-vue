import { MessageType } from '@/global/enums/message-type.enum';
import { ApiClient } from '../service/api-client';
import { useGlobalStore } from '../store/global.store';
import { Message } from '@/global/models/message';

export class FetchClient extends ApiClient {
  constructor() {
    super(import.meta.env.VITE_API_URL);
  }

  async getData<T, R = T>(url: string): Promise<R> {
    try {
      const apiRes = await fetch(`${this.baseURL}/${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return apiRes.json();
    } catch (err) {
      return this.handleApiError(err);
    }
  }

  async deleteData<T = undefined>(url: string): Promise<T> {
    try {
      const apiRes = await fetch(`${this.baseURL}/${url}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return apiRes.json();
    } catch (err) {
      return this.handleApiError(err);
    }
  }

  async patchData<T, R = void>(url: string, body: T): Promise<R> {
    try {
      const apiRes = await fetch(`${this.baseURL}${url}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const textData = await apiRes.text();
      let responseData;

      try {
        responseData = JSON.parse(textData);
      } catch (err) {
        responseData = textData;
      }

      return responseData as R;
    } catch (err) {
      return this.handleApiError(err);
    }
  }

  async postData<T, R = void>(url: string, body: T): Promise<R> {
    try {
      const apiRes = await fetch(`${this.baseURL}${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const textData = await apiRes.text();
      let responseData;

      try {
        responseData = JSON.parse(textData);
      } catch (err) {
        responseData = textData;
      }

      return responseData as R;
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
