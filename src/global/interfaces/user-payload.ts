import { IDashboardPrivileges } from '@/modules/dashboard/interfaces/IDashoardPrivileges';
import { Roles } from '../enums/roles.enum';

export interface IUserPayload {
  id: number;
  email: string;
  role: Roles;
  privileges: IDashboardPrivileges;
  name: string;
  lastname: string;
}
