import { RouteRecordRaw } from 'vue-router';
import { DashboardRoutesNames } from './enums/dashboard-routes-names.enum';
import { DashboardModulesEnum } from './enums/dashboard-modules.enum';
import { hasHigherPrivilegeThanNotAllowed } from './helpers/privileges.helpers';
import { Roles } from '@/global/enums/roles.enum';
import DashboardLayout from './dashboard-layout.vue';
import router from '@/plugins/router';

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
        beforeEnter: (to, from, next) => {
          if (
            hasHigherPrivilegeThanNotAllowed(
              DashboardModulesEnum.PRODUCTS,
            )
          ) {
            next();
          } else {
            router.push({ name: DashboardModulesEnum.DASHBOARD });
          }
        },
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
        beforeEnter: (to, from, next) => {
          if (
            hasHigherPrivilegeThanNotAllowed(
              DashboardModulesEnum.PRODUCTS,
            )
          ) {
            next();
          } else {
            router.push({ name: DashboardModulesEnum.DASHBOARD });
          }
        },
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
        beforeEnter: (to, from, next) => {
          if (
            hasHigherPrivilegeThanNotAllowed(
              DashboardModulesEnum.STAFF_MEMBERS,
            )
          ) {
            next();
          } else {
            router.push({ name: DashboardModulesEnum.DASHBOARD });
          }
        },
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
        beforeEnter: (to, from, next) => {
          if (
            hasHigherPrivilegeThanNotAllowed(
              DashboardModulesEnum.CATEGORIES,
            )
          ) {
            next();
          } else {
            router.push({ name: DashboardModulesEnum.DASHBOARD });
          }
        },
      },
    ],
  },
];
