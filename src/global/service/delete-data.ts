import { MessageType } from '../enums/message-type.enum';
import { Message } from '../models/message';
import { useGlobalStore } from '../store/global.store';
import { API } from '../utils/axios';

export async function deleteData<T = undefined>(
  url: string,
  body?: T,
): Promise<void> {
  try {
    await API.delete<void>(url, {
      ...body,
    });
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
