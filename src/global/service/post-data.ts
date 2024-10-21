import { Message } from '../models/message';
import { useGlobalStore } from '../store/global.store';
import { API } from '../utils/axios';

export async function postData<T, R = void>(
  url: string,
  body: T,
): Promise<R> {
  try {
    const apiRes = await API.post<R>(url, {
      ...body,
    });
    return apiRes.data;
  } catch (err) {
    const globalStore = useGlobalStore();
    const errorMsg = Message.getErrorMessage();
    errorMsg.content =
      err instanceof Error ? err.message : 'Something went wrong';

    globalStore.addMessage(errorMsg);
    console.error(err);
    throw err;
  }
}
