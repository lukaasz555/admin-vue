import { RouteRecordRaw } from 'vue-router';
import { DashboardRoutesNames } from './enums/dashboard-routes-names.enum';
import { DashboardModulesEnum } from './enums/dashboard-modules.enum';
import { Roles } from '@/global/enums/roles.enum';
import DashboardLayout from './dashboard-layout.vue';
import { privilegesMiddleware } from './helpers/privilegesMiddleware';

export enum DashboardPathNames {
  ROOT = '',
  PRODUCTS = 'products',
  PRODUCT = 'product/:id',
  STAFF = 'staff',
  CATEGORIES = 'categories',
}

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      {
        path: DashboardPathNames.ROOT,
        name: DashboardRoutesNames.DASHBOARD,
        component: () =>
          import('@/modules/dashboard/dashboard-view.vue'),
        meta: {
          requiresAuth: true,
          module: DashboardModulesEnum.DASHBOARD,
          roles: [Roles.ADMIN, Roles.MANAGER, Roles.ASSISTANT],
        },
      },
      {
        path: DashboardPathNames.PRODUCTS,
        name: DashboardRoutesNames.PRODUCTS,
        component: () =>
          import('@/modules/dashboard/products/products-view.vue'),
        meta: {
          requiresAuth: true,
          module: DashboardModulesEnum.PRODUCTS,
          roles: [Roles.ADMIN, Roles.MANAGER, Roles.ASSISTANT],
        },
        beforeEnter: privilegesMiddleware(
          DashboardModulesEnum.PRODUCTS,
        ),
      },
      {
        path: DashboardPathNames.PRODUCT,
        name: DashboardRoutesNames.PRODUCT,
        component: () =>
          import('@/modules/dashboard/products/product-view.vue'),
        meta: {
          requiresAuth: true,
          module: DashboardModulesEnum.PRODUCTS,
          roles: [Roles.ADMIN, Roles.MANAGER],
        },
        beforeEnter: privilegesMiddleware(
          DashboardModulesEnum.PRODUCTS,
        ),
      },
      {
        path: DashboardPathNames.STAFF,
        name: DashboardRoutesNames.STAFF,
        component: () =>
          import('@/modules/dashboard/staff/staff-view.vue'),
        meta: {
          requiresAuth: true,
          module: DashboardModulesEnum.STAFF_MEMBERS,
          roles: [Roles.ADMIN, Roles.MANAGER],
        },
        beforeEnter: privilegesMiddleware(
          DashboardModulesEnum.STAFF_MEMBERS,
        ),
      },
      {
        path: DashboardPathNames.CATEGORIES,
        name: DashboardRoutesNames.CATEGORIES,
        component: () =>
          import(
            '@/modules/dashboard/categories/categories-view.vue'
          ),
        meta: {
          requiresAuth: true,
          module: DashboardModulesEnum.CATEGORIES,
          roles: [Roles.ADMIN, Roles.MANAGER, Roles.ASSISTANT],
        },
        beforeEnter: privilegesMiddleware(
          DashboardModulesEnum.CATEGORIES,
        ),
      },
    ],
  },
];
