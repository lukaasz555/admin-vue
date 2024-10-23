import { RouteRecordRaw } from 'vue-router';
import { AuthRoutesNames } from './enums/auth-routes-names.enum';
import { AuthPathNames } from './enums/auth-path-names.enum';
import { Module } from '@/global/enums/module.enum';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: AuthPathNames.ROOT,
    name: AuthRoutesNames.AUTH,
    component: () => import('@/modules/auth/views/auth-view.vue'),
    meta: {
      module: Module.AUTH,
      requiresAuth: false,
      roles: [],
    },
    children: [
      {
        path: AuthPathNames.LOGIN,
        name: AuthRoutesNames.LOGIN,
        component: () =>
          import('@/modules/auth/views/login-view.vue'),
        meta: {
          module: Module.AUTH,
          requiresAuth: false,
          roles: [],
        },
      },
      {
        path: AuthPathNames.FORGOT_PASSWORD,
        name: AuthRoutesNames.FORGOT_PASSWORD,
        component: () =>
          import('@/modules/auth/views/forgot-password-view.vue'),
        meta: {
          module: Module.AUTH,
          requiresAuth: false,
          roles: [],
        },
      },
    ],
  },
];
