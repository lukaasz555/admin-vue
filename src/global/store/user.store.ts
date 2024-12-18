import { defineStore } from 'pinia';
import { IUserPayload } from '../interfaces/user-payload';
import { getUserPayloadFromToken } from '../helpers/get-user-payload-from-token';
import { LocalStorage } from '../enums/local-storage.enum';
import { AuthRoutesNames } from '@/modules/auth/enums/auth-routes-names.enum';
import router from '@/plugins/router';
import { DashboardModulesEnum } from '@/modules/dashboard/enums/dashboard-modules.enum';

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
    logout(): void {
      this.$reset();
      localStorage.removeItem(LocalStorage.STORE_TOKEN);
      localStorage.removeItem(LocalStorage.STORE_USER);
      router.push({ name: AuthRoutesNames.LOGIN });
    },
    getUserFromLS(): void {
      try {
        const token = localStorage.getItem(LocalStorage.STORE_TOKEN);
        const user = localStorage.getItem(LocalStorage.STORE_USER);
        if (token && user) {
          this.token = token;
          this.user = JSON.parse(user);
        }
      } catch (err) {
        console.error(err);
        this.$reset();
      }
    },
    getPrivilegesForModule(module: DashboardModulesEnum) {
      if (this.user) {
        const privileges = this.user.privileges;
        return privileges[module];
      }
    },
  },
  getters: {
    isLoggedIn(): boolean {
      return !!this.token && !!this.user;
    },
  },
});
