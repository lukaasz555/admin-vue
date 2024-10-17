import { RouteRecordRaw } from 'vue-router';
import { AuthRoutesNames } from './enums/auth-routes-names.enum';

export const authRoutes: RouteRecordRaw[] = [
    {
        path: '',
        name: AuthRoutesNames.AUTH,
        component: () => import('@/modules/auth/views/auth-view.vue'),
    },
    {
        path: 'login',
        name: AuthRoutesNames.LOGIN,
        component: () =>
            import('@/modules/auth/views/login-view.vue'),
    },
    {
        path: 'forgot-password',
        name: AuthRoutesNames.FORGOT_PASSWORD,
        component: () =>
            import('@/modules/auth/views/forgot-password-view.vue'),
    },
];
