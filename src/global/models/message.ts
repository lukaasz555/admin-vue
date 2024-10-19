import { MessageType } from '../enums/message-type.enum';

export class Message {
  type = MessageType.INFO;
  title = '';
  content = '';
  timestamp = Date.now();

  static getErrorMessage(): Message {
    const message = new Message();
    message.type = MessageType.ERROR;
    message.title = 'Error';
    message.timestamp = Date.now();
    return message;
  }
}
