import { Roles } from '@/global/enums/roles.enum';
import { getUniqueId } from '@/global/helpers/get-unique-id';
import { Privileges } from './privileges';

export class StaffMember {
  id = -getUniqueId();
  name = '';
  lastname = '';
  email = '';
  role = Roles.ASSISTANT;
  phone = '';
  privileges = new Privileges();

  get fullName(): string {
    return `${this.name} ${this.lastname}`;
  }
}
