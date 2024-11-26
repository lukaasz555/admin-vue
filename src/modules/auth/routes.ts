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
    ],
  },
];
