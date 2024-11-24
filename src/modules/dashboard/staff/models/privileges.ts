import { Privileges as PrivilegesEnum } from '@/global/enums/privileges.enum';
import { IDashboardPrivileges } from '../../interfaces/IDashoardPrivileges';
import { DashboardModulesEnum } from '../../enums/dashboard-modules.enum';

export class Privileges implements IDashboardPrivileges {
  [DashboardModulesEnum.CATEGORIES] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.PRODUCTS] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.STAFF_MEMBERS] = PrivilegesEnum.NOT_ALLOWED;
  [DashboardModulesEnum.DASHBOARD] = PrivilegesEnum.NOT_ALLOWED;

  setPrivilege(
    key: DashboardModulesEnum,
    value: PrivilegesEnum,
  ): this {
    this[key] = value;
    return this;
  }

  getDataForUpdate(): IDashboardPrivileges {
    return {
      [DashboardModulesEnum.PRODUCTS]:
        this[DashboardModulesEnum.PRODUCTS],
      [DashboardModulesEnum.STAFF_MEMBERS]:
        this[DashboardModulesEnum.STAFF_MEMBERS],
      [DashboardModulesEnum.CATEGORIES]:
        this[DashboardModulesEnum.CATEGORIES],
      [DashboardModulesEnum.DASHBOARD]:
        this[DashboardModulesEnum.DASHBOARD],
    };
  }
}
