import { createRouter, createWebHistory } from 'vue-router/auto';
import { authRoutes } from '@/modules/auth/routes';
import { dashboardRoutes } from '@/modules/dashboard/routes';
import { useUserStore } from '@/global/store/user.store';
import { AuthRoutesNames } from '@/modules/auth/enums/auth-routes-names.enum';
import { Message } from '@/global/models/message';
import { useGlobalStore } from '@/global/store/global.store';
import { DashboardRoutesNames } from '@/modules/dashboard/enums/dashboard-routes-names.enum';
import { MessageType } from '@/global/enums/message-type.enum';

const routes = [
  {
    path: '/',
    children: [...dashboardRoutes],
  },
  {
    path: '/auth',
    children: [...authRoutes],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  if (
    to.name === AuthRoutesNames.AUTH ||
    (to.meta.requiresAuth && !userStore.isLoggedIn)
  ) {
    next({ name: AuthRoutesNames.LOGIN });
  }

  if (!to.meta.requiresAuth && userStore.isLoggedIn) {
    next({ name: DashboardRoutesNames.DASHBOARD });
  }

  if (
    to.meta.requiresAuth &&
    userStore.isLoggedIn &&
    userStore.user
  ) {
    const hasUserSufficientRole = to.meta.roles.includes(
      userStore.user.role,
    );
    if (!hasUserSufficientRole) {
      const message = Message.getMessage(MessageType.WARNING);
      message.content = 'Access denied';
      useGlobalStore().addMessage(message);
      next(false);
    }
  }
  next();
});

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (
    err?.message?.includes?.(
      'Failed to fetch dynamically imported module',
    )
  ) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error');
      localStorage.setItem('vuetify:dynamic-reload', 'true');
      location.assign(to.fullPath);
    } else {
      console.error(
        'Dynamic import error, reloading page did not fix it',
        err,
      );
    }
  } else {
    console.error(err);
  }
});

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload');
});

export default router;
