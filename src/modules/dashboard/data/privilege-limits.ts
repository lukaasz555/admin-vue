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
    [DashboardModulesEnum.CUSTOMERS]: [
      PrivilegesEnum.FULL,
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
    ],
    [DashboardModulesEnum.DISCOUNTS]: [
      PrivilegesEnum.FULL,
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
    ],
    [DashboardModulesEnum.PRODUCTS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
    ],
    [DashboardModulesEnum.ORDERS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
    ],
    [DashboardModulesEnum.REPORTS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
    ],
    [DashboardModulesEnum.SETTINGS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
    ],
    [DashboardModulesEnum.STAFF_MEMBERS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [DashboardModulesEnum.PAYMENTS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
  },
  [Roles.ASSISTANT]: {
    [DashboardModulesEnum.CUSTOMERS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [DashboardModulesEnum.DISCOUNTS]: [
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [DashboardModulesEnum.PRODUCTS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [DashboardModulesEnum.ORDERS]: [
      PrivilegesEnum.MANAGE,
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [DashboardModulesEnum.REPORTS]: [
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [DashboardModulesEnum.SETTINGS]: [
      PrivilegesEnum.NOT_ALLOWED,
      PrivilegesEnum.READONLY,
    ],
    [DashboardModulesEnum.STAFF_MEMBERS]: [
      PrivilegesEnum.NOT_ALLOWED,
    ],
    [DashboardModulesEnum.PAYMENTS]: [
      PrivilegesEnum.READONLY,
      PrivilegesEnum.NOT_ALLOWED,
    ],
  },
};
