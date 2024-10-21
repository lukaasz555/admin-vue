import { defineStore } from 'pinia';
import { IUserPayload } from '../interfaces/user-payload';
import { getUserPayloadFromToken } from '../helpers/get-user-payload-from-token';
import { LocalStorage } from '../enums/local-storage.enum';

interface UserStoreState {
  token: string;
  user: IUserPayload | null;
  isLoading: boolean;
}

const initState = (): UserStoreState => ({
  token: '',
  user: null,
  isLoading: false,
});

export const useUserStore = defineStore('userStore', {
  state: initState,
  actions: {
    setUserWithToken(token: string): void {
      this.user = getUserPayloadFromToken(token);
      this.token = token;
      localStorage.setItem(LocalStorage.STORE_TOKEN, token);
      localStorage.setItem(
        LocalStorage.STORE_USER,
        JSON.stringify(this.user),
      );
    },
  },
});
