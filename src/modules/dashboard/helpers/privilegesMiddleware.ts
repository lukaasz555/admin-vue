import router from '@/plugins/router';
import { DashboardModulesEnum } from '../enums/dashboard-modules.enum';
import { hasHigherPrivilegeThanNotAllowed } from './privileges.helpers';
import {
  NavigationGuardNext,
  RouteLocationNormalizedGeneric,
  RouteLocationNormalizedLoadedGeneric,
} from 'vue-router';

export function privilegesMiddleware(module: DashboardModulesEnum) {
  return (
    to: RouteLocationNormalizedGeneric,
    from: RouteLocationNormalizedLoadedGeneric,
    next: NavigationGuardNext,
  ) => {
    if (hasHigherPrivilegeThanNotAllowed(module)) {
      next();
    } else {
      router.push({ name: DashboardModulesEnum.DASHBOARD });
    }
  };
}
