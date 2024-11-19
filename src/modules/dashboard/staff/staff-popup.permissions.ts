import { Privileges } from '@/global/enums/privileges.enum';
import { isPrivilegeSufficient } from '../helpers/privileges.helpers';

export interface IStaffPopupPermissions {
  canAdd: boolean;
  canRemove: boolean;
  canEditStaffData: boolean;
  canEditStaffPrivileges: boolean;
}

export const getStaffPopupPermissions = (
  userPrivilege?: Privileges,
): IStaffPopupPermissions => {
  if (userPrivilege) {
    return {
      canAdd: isPrivilegeSufficient(userPrivilege, Privileges.MANAGE),
      canRemove: isPrivilegeSufficient(
        userPrivilege,
        Privileges.FULL,
      ),
      canEditStaffData: isPrivilegeSufficient(
        userPrivilege,
        Privileges.MANAGE,
      ),
      canEditStaffPrivileges: isPrivilegeSufficient(
        userPrivilege,
        Privileges.FULL,
      ),
    };
  } else {
    return {
      canAdd: false,
      canRemove: false,
      canEditStaffData: false,
      canEditStaffPrivileges: false,
    };
  }
};
