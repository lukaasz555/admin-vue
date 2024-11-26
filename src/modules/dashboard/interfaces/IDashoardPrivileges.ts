import { Privileges } from '@/global/enums/privileges.enum';
import { DashboardModulesEnum } from './../enums/dashboard-modules.enum';

export interface IDashboardPrivileges {
  [DashboardModulesEnum.CATEGORIES]: Privileges;
  [DashboardModulesEnum.PRODUCTS]: Privileges;
  [DashboardModulesEnum.STAFF_MEMBERS]: Privileges;
  [DashboardModulesEnum.DASHBOARD]: Privileges;
}
