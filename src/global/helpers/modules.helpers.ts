import { DashboardModulesEnum } from '@/modules/dashboard/enums/dashboard-modules.enum';
import { AuthModulesEnum } from '@/modules/auth/enums/auth-modules.enum';
import { ModulesType } from '../types/modules.type';

export function isDashboardModulesEnum(
  module: ModulesType,
): module is DashboardModulesEnum {
  return Object.values(DashboardModulesEnum).includes(
    module as DashboardModulesEnum,
  );
}
export function isAuthModulesEnum(
  module: ModulesType,
): module is AuthModulesEnum {
  return Object.values(AuthModulesEnum).includes(
    module as AuthModulesEnum,
  );
}
