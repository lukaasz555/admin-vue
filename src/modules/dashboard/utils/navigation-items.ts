import { Privileges } from '@/global/enums/privileges.enum';
import { useUserStore } from '@/global/store/user.store';
import { IUserPayload } from '@/global/interfaces/user-payload';
import { isDashboardModulesEnum } from '@/global/helpers/modules.helpers';
import { DashboardRoutesNames } from '../enums/dashboard-routes-names.enum';
import { dashboardRoutes } from '../routes';
import { NavigationItem } from '../types/navigation-item';
import i18n from '@/plugins/i18n';

const items: Omit<NavigationItem, 'hasUserAccess'>[] = [
  {
    title: i18n.global.t('Dashboard'),
    routeName: DashboardRoutesNames.DASHBOARD,
    icon: 'mdi-view-dashboard',
  },
  {
    title: i18n.global.t('Products'),
    routeName: DashboardRoutesNames.PRODUCTS,
    icon: 'mdi-cube',
  },
  {
    title: i18n.global.t('Staff'),
    routeName: DashboardRoutesNames.STAFF,
    icon: 'mdi-account-group',
  },
  {
    title: i18n.global.t('Categories'),
    routeName: DashboardRoutesNames.CATEGORIES,
  },
];

function checkIfUserHasRouteAccess(
  user: IUserPayload | null,
  routeName: DashboardRoutesNames,
): boolean {
  if (!user) return false;

  const allDashboardRoutes = dashboardRoutes
    .map((el) => el.children ?? [])
    .flat();
  const route = allDashboardRoutes.find(
    (route) => route.name === routeName,
  );

  if (!route || !route.meta) return false;

  if (!route.meta.roles.includes(user.role)) {
    return false;
  }

  if (isDashboardModulesEnum(route.meta.module)) {
    const modulePrivilege = route.meta.module;
    const userModulePrivilege = user.privileges[modulePrivilege];
    return userModulePrivilege !== Privileges.NOT_ALLOWED;
  }
  return false;
}

export const navigationItems = computed(() => {
  const user = useUserStore().user;

  return items
    .map((item) => ({
      ...item,
      hasUserAccess: checkIfUserHasRouteAccess(user, item.routeName),
    }))
    .filter((item) => item.hasUserAccess);
});
