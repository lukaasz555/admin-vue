import { DashboardRoutesNames } from '../enums/dashboard-routes-names.enum';

export type NavigationItem = {
  title: string;
  routeName: DashboardRoutesNames;
  icon?: string;
};
