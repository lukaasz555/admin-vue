import { Privileges as PrivilegesEnum } from '@/global/enums/privileges.enum';

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
