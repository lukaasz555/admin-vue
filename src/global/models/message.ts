import { MessageType } from '../enums/message-type.enum';

export class Message {
  type = MessageType.INFO;
  title = '';
  content = '';
  timestamp = Date.now();
}
