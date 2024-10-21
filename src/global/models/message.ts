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

  static getWarningMessage(): Message {
    const message = new Message();
    message.type = MessageType.WARNING;
    message.title = 'Warning';
    message.timestamp = Date.now();
    return message;
  }

  static getSuccessMessage(): Message {
    const message = new Message();
    message.type = MessageType.SUCCESS;
    message.title = 'Success';
    message.timestamp = Date.now();
    return message;
  }
}
