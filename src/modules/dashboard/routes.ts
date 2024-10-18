import { RouteRecordRaw } from 'vue-router';
import { DashboardRoutesNames } from './enums/dashboard-routes-names.enum';

export enum DashboardPathNames {
  ROOT = '',
  PRODUCTS = 'products',
  PRODUCT = 'product/:id',
  STAFF = 'staff',
  CATEGORIES = 'categories',
}

export const dashboardRoutes: RouteRecordRaw[] = [
  {
    path: DashboardPathNames.ROOT,
    name: DashboardRoutesNames.DASHBOARD,
    component: () => import('@/modules/dashboard/dashboard-view.vue'),
  },
  {
    path: DashboardPathNames.PRODUCTS,
    name: DashboardRoutesNames.PRODUCTS,
    component: () =>
      import('@/modules/dashboard/products/products-view.vue'),
  },
  {
    path: DashboardPathNames.PRODUCT,
    name: DashboardRoutesNames.PRODUCT,
    component: () =>
      import('@/modules/dashboard/products/product-view.vue'),
  },
  {
    path: DashboardPathNames.STAFF,
    name: DashboardRoutesNames.STAFF,
    component: () =>
      import('@/modules/dashboard/staff/staff-view.vue'),
  },
  {
    path: DashboardPathNames.CATEGORIES,
    name: DashboardRoutesNames.CATEGORIES,
    component: () =>
      import('@/modules/dashboard/categories/categories-view.vue'),
  },
];
