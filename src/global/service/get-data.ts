import { useGlobalStore } from '../store/global.store';
import { API } from '../utils/axios';
import { Message } from '../models/message';
import { MessageType } from '../enums/message-type.enum';

export async function getData<T, R = T>(
  url: string,
  params?: T,
): Promise<R> {
  try {
    const apiRes = await API.get<R>(url, { params });
    return apiRes.data;
  } catch (err) {
    const globalStore = useGlobalStore();
    const errorMsg = Message.getMessage(MessageType.ERROR);
    errorMsg.content =
      err instanceof Error ? err.message : 'Something went wrong';

    globalStore.addMessage(errorMsg);
    console.error(err);
    throw err;
  }
}
