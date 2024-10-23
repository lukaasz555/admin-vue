import { MessageType } from '../enums/message-type.enum';
import { getUniqueId } from '../helpers/get-unique-id';

function getMessageTitle(messageType: MessageType): string {
  switch (messageType) {
    case MessageType.ERROR:
      return 'Error';
    case MessageType.WARNING:
      return 'Warning';
    case MessageType.SUCCESS:
      return 'Success';
    default:
      return 'Info';
  }
}

export class Message {
  type = MessageType.INFO;
  title = '';
  content = '';
  id = 0;

  getTitle(messageType: MessageType): string {
    switch (messageType) {
      case MessageType.ERROR:
        return 'Error';
      case MessageType.WARNING:
        return 'Warning';
      case MessageType.SUCCESS:
        return 'Success';
      default:
        return 'Info';
    }
  }

  static getMessage(messageType: MessageType): Message {
    const message = new Message();
    message.type = messageType;
    message.title = getMessageTitle(messageType);
    message.id = getUniqueId();

    return message;
  }
}
