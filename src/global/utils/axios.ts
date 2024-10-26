import axios from 'axios';
import { LocalStorage } from '../enums/local-storage.enum';

const baseURL = `${import.meta.env.VITE_API_URL}`;

export const API = axios.create({
  baseURL,
});

API.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(LocalStorage.STORE_TOKEN);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
