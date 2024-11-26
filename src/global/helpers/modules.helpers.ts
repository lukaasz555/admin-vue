import { DashboardModulesEnum } from '@/modules/dashboard/enums/dashboard-modules.enum';
import { AuthModulesEnum } from '@/modules/auth/enums/auth-modules.enum';
import { ModulesType } from '../types/modules.type';

export function isDashboardModulesEnum(
  module: ModulesType,
): module is DashboardModulesEnum {
  return isModuleType(module, DashboardModulesEnum);
}

export function isAuthModulesEnum(
  module: ModulesType,
): module is AuthModulesEnum {
  return isModuleType(module, AuthModulesEnum);
}

export function isModuleType<T extends Object>(
  module: ModulesType,
  moduleEnum: T,
): boolean {
  return Object.values(moduleEnum).includes(module);
}
