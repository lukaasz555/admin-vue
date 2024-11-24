import { Roles } from '@/global/enums/roles.enum';
import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';
import { Privileges as PrivilegesEnum } from '@/global/enums/privileges.enum';

type RolePrivilegeLimit = {
  [role in Roles]: {
    [module in DashboardModulesEnum]?: PrivilegesEnum[];
  };
};

// ! IMPORTANT -> this should be moved to the backend and fetched from api
export const rolePrivelegeLimits: RolePrivilegeLimit = {
  [Roles.ADMIN]: {}, // admin always has full access to all modules
  [Roles.MANAGER]: {
    [DashboardModulesEnum.PRODUCTS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
    ],
    [DashboardModulesEnum.STAFF_MEMBERS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [DashboardModulesEnum.CATEGORIES]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
    ],
  },
  [Roles.ASSISTANT]: {
    [DashboardModulesEnum.PRODUCTS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [DashboardModulesEnum.CATEGORIES]: [
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [DashboardModulesEnum.STAFF_MEMBERS]: [
      PrivilegesEnum.NOT_ALLOWED,
    ],
  },
};
