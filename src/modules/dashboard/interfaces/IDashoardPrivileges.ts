import { Privileges } from '@/global/enums/privileges.enum';
import { DashboardModulesEnum } from './../enums/dashboard-modules.enum';

export interface IDashboardPrivileges {
  [DashboardModulesEnum.CATEGORIES]: Privileges;
  [DashboardModulesEnum.PRODUCTS]: Privileges;
  [DashboardModulesEnum.CUSTOMERS]: Privileges;
  [DashboardModulesEnum.DISCOUNTS]: Privileges;
  [DashboardModulesEnum.STAFF_MEMBERS]: Privileges;
  [DashboardModulesEnum.ORDERS]: Privileges;
  [DashboardModulesEnum.PAYMENTS]: Privileges;
  [DashboardModulesEnum.REPORTS]: Privileges;
  [DashboardModulesEnum.SETTINGS]: Privileges;
  [DashboardModulesEnum.DASHBOARD]: Privileges;
}
