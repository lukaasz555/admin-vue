import axios from 'axios';
import { LocalStorage } from '../enums/local-storage.enum';
import { useUserStore } from '../store/user.store';

const baseURL = import.meta.env.VITE_API_URL;
const userStore = useUserStore();

export const API = axios.create({
  baseURL,
});

API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(LocalStorage.STORE_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  if (userStore.user) {
    config.headers.userId = userStore.user.id;
  }

  return config;
});
