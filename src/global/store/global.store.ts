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
        this.removeMessage(message.id);
      }, 5000);
    },
    removeMessage(messageId: number): void {
      this.messages = this.messages.filter((m) => m.id !== messageId);
    },
  },
  getters: {
    sortedMessages(): Message[] {
      return this.messages.sort((a, b) => b.id - a.id);
    },
  },
});
