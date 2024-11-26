import 'vue-router';
import { Roles } from './global/enums/roles.enum';
import { ModulesType } from './global/types/modules.type';

export {}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean;
    roles: Roles[];
    module: ModulesType
  }
}