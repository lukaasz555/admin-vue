import { RouteRecordRaw } from 'vue-router';
import { DashboardRoutesNames } from './enums/dashboard-routes-names.enum';

export const dashboardRoutes: RouteRecordRaw[] = [
    {
        path: '',
        name: DashboardRoutesNames.DASHBOARD,
        component: () =>
            import('@/modules/dashboard/dashboard-view.vue'),
    },
    {
        path: 'products',
        name: DashboardRoutesNames.PRODUCTS,
        component: () =>
            import('@/modules/dashboard/products/products-view.vue'),
    },
    {
        path: 'product/:id',
        name: DashboardRoutesNames.PRODUCT,
        component: () =>
            import('@/modules/dashboard/products/product-view.vue'),
    },
    {
        path: 'staff',
        name: DashboardRoutesNames.STAFF,
        component: () =>
            import('@/modules/dashboard/staff/staff-view.vue'),
    },
    {
        path: 'categories',
        name: DashboardRoutesNames.CATEGORIES,
        component: () =>
            import(
                '@/modules/dashboard/categories/categories-view.vue'
            ),
    },
];
