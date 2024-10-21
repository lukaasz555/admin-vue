import { defineStore } from 'pinia';
import { Message } from '../models/message';

export interface GlobalStoreState {
  messages: Message[];
}

const initState = (): GlobalStoreState => ({
  messages: [],
});

export const useGlobalStore = defineStore('globalStore', {
  state: initState,
  actions: {
    addMessage(message: Message): void {
      if (this.messages.length >= 3) {
        this.messages.shift();
      }
      this.messages.push(message);
      setTimeout(() => {
        this.removeMessage(message.timestamp);
      }, 5000);
    },
    removeMessage(messageTimestamp: number): void {
      this.messages = this.messages.filter(
        (m) => m.timestamp !== messageTimestamp,
      );
    },
  },
});
