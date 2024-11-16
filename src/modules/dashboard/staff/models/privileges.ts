import { Privileges as PrivilegesEnum } from '@/global/enums/privileges.enum';
import { IDashboardPrivileges } from '../../interfaces/IDashoardPrivileges';
import { DashboardModulesEnum } from '../../enums/dashboard-modules.enum';

export class Privileges implements IDashboardPrivileges {
  [DashboardModulesEnum.CATEGORIES] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.CUSTOMERS] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.DISCOUNTS] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.ORDERS] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.PAYMENTS] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.PRODUCTS] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.REPORTS] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.STAFF_MEMBERS] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.SETTINGS] = PrivilegesEnum.NOT_ALLOWED;

  setPrivilege(
    key: DashboardModulesEnum,
    value: PrivilegesEnum,
  ): this {
    this[key] = value;
    return this;
  }
}
