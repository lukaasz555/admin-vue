import { defineStore } from 'pinia';
import { Message } from '../models/message';
import { DashboardRolePrivilegeLimitType } from '../types/dashboard-role-privilege-limit.type';

export interface GlobalStoreState {
  messages: Message[];
  privilegeLimits: DashboardRolePrivilegeLimitType | null;
}

const initState = (): GlobalStoreState => ({
  messages: [],
  privilegeLimits: null,
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
    setPrivilegeLimits(
      privilegeLimits: DashboardRolePrivilegeLimitType,
    ): void {
      this.privilegeLimits = privilegeLimits;
    },
  },
  getters: {
    sortedMessages(): Message[] {
      return this.messages.sort((a, b) => b.id - a.id);
    },
  },
});
