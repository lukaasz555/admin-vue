import { RouteRecordRaw } from 'vue-router';
import { AuthRoutesNames } from './enums/auth-routes-names.enum';
import { AuthPathNames } from './enums/auth-path-names.enum';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: AuthPathNames.ROOT,
    name: AuthRoutesNames.AUTH,
    component: () => import('@/modules/auth/views/auth-view.vue'),
  },
  {
    path: AuthPathNames.LOGIN,
    name: AuthRoutesNames.LOGIN,
    component: () => import('@/modules/auth/views/login-view.vue'),
  },
  {
    path: AuthPathNames.FORGOT_PASSWORD,
    name: AuthRoutesNames.FORGOT_PASSWORD,
    component: () =>
      import('@/modules/auth/views/forgot-password-view.vue'),
  },
];
