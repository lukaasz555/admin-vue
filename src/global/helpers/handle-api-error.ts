import { MessageType } from '../enums/message-type.enum';
import { Message } from '../models/message';
import { useGlobalStore } from '../store/global.store';

export function handleApiError<R>(err: unknown): R {
  const globalStore = useGlobalStore();
  const errorMessage = Message.getMessage(MessageType.ERROR);
  errorMessage.content =
    err instanceof Error ? err.message : 'Something went wrong';

  globalStore.addMessage(errorMessage);
  console.error(err);
  throw err;
}
