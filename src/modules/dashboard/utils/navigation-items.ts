import { DashboardRoutesNames } from '../enums/dashboard-routes-names.enum';
import { NavigationItem } from '../types/navigation-item';

export const navigationItems: NavigationItem[] = [
  {
    title: 'Dashboard',
    routeName: DashboardRoutesNames.DASHBOARD,
    icon: 'mdi-view-dashboard',
  },
  {
    title: 'Products',
    routeName: DashboardRoutesNames.PRODUCTS,
    icon: 'mdi-cube',
  },
  {
    title: 'Staff',
    routeName: DashboardRoutesNames.STAFF,
    icon: 'mdi-account-group',
  },
  {
    title: 'Categories',
    routeName: DashboardRoutesNames.CATEGORIES,
  },
];
