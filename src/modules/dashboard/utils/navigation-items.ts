import i18n from '@/plugins/i18n';
import { DashboardRoutesNames } from '../enums/dashboard-routes-names.enum';
import { NavigationItem } from '../types/navigation-item';

export const navigationItems: NavigationItem[] = [
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
