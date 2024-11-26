import { TranslateResult } from 'vue-i18n';
import { MessageType } from '@/global/enums/message-type.enum';
import { Message } from '@/global/models/message';
import { useGlobalStore } from '@/global/store/global.store';

export function handleError(
  messageText: TranslateResult,
  cb?: () => void,
): void {
  const message = Message.getMessage(MessageType.ERROR);
  message.content = messageText;
  useGlobalStore().addMessage(message);
  if (cb) {
    cb();
  }
}

export function handleSuccess(
  messageText: TranslateResult,
  cb?: () => void,
): void {
  const message = Message.getMessage(MessageType.SUCCESS);
  message.content = messageText;
  useGlobalStore().addMessage(message);
  if (cb) {
    cb();
  }
}
