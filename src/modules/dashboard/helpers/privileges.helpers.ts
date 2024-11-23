import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';
import { useUserStore } from '@/global/store/user.store';
import {
  Privileges,
  Privileges as PrivilegesEnum,
} from '@/global/enums/privileges.enum';

export function isPrivilegeSufficient(
  userPrivilege: PrivilegesEnum,
  modulePrivilege?: PrivilegesEnum,
): boolean {
  if (!modulePrivilege) return false;

  switch (userPrivilege) {
    case PrivilegesEnum.FULL:
      return true;
    case PrivilegesEnum.MANAGE:
      return modulePrivilege !== PrivilegesEnum.FULL;
    case PrivilegesEnum.READONLY:
      return !(
        modulePrivilege === PrivilegesEnum.FULL ||
        modulePrivilege === PrivilegesEnum.MANAGE
      );
    case PrivilegesEnum.NOT_ALLOWED:
      return false;
  }
}

export function hasHigherPrivilegeThanNotAllowed(
  moduleName: DashboardModulesEnum,
) {
  const userStore = useUserStore();
  const privilege = userStore.getPrivilegesForModule(moduleName);

  return privilege && privilege !== Privileges.NOT_ALLOWED;
}
