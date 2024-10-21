import 'vue-router';
import { Roles } from './global/enums/roles.enum';
import { Module } from './global/enums/module.enum';

export {}

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth: boolean;
    roles: Roles[];
    module: Module
  }
}