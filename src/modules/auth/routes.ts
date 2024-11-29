import { RouteRecordRaw } from 'vue-router';
import { AuthRoutesNames } from './enums/auth-routes-names.enum';
import { AuthModulesEnum } from './enums/auth-modules.enum';
import { AuthPathNames } from './enums/auth-path-names.enum';

export const authRoutes: RouteRecordRaw[] = [
  {
    path: AuthPathNames.ROOT,
    name: AuthRoutesNames.AUTH,
    component: () => import('@/modules/auth/views/auth-view.vue'),
    meta: {
      module: AuthModulesEnum.ROOT,
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
          module: AuthModulesEnum.LOGIN,
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
          module: AuthModulesEnum.FORGOT_PASSWORD,
          requiresAuth: false,
          roles: [],
        },
      },
      {
        path: AuthPathNames.RESET_PASSWORD,
        name: AuthRoutesNames.RESET_PASSWORD,
        component: () =>
          import('@/modules/auth/views/reset-password-view.vue'),
        meta: {
          module: AuthModulesEnum.RESET_PASSWORD,
          requiresAuth: false,
          roles: [],
        },
      },
      {
        path: AuthPathNames.CHANGE_PASSWORD,
        name: AuthRoutesNames.CHANGE_PASSWORD,
        component: () =>
          import('@/modules/auth/views/change-password-view.vue'),
        meta: {
          module: AuthModulesEnum.CHANGE_PASSWORD,
          requiresAuth: false,
          roles: [],
        },
      },
    ],
  },
];
