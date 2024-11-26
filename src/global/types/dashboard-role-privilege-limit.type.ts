import { DashboardModulesEnum } from '@/modules/dashboard/enums/dashboard-modules.enum';
import { Roles } from '../enums/roles.enum';
import { Privileges } from '../enums/privileges.enum';

export type DashboardRolePrivilegeLimitType = {
  [role in Roles]: {
    [module in DashboardModulesEnum]: Privileges;
  };
};
