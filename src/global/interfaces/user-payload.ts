import { Privileges } from '../enums/privileges.enum';
import { Roles } from '../enums/roles.enum';

export interface IUserPayload {
  id: number;
  email: string;
  role: Roles;
  privileges: Privileges;
  name: string;
  lastname: string;
}
