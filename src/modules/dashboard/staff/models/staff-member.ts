import { Roles } from '@/global/enums/roles.enum';
import { getUniqueId } from '@/global/helpers/get-unique-id';
import { Privileges } from './privileges';
import { Type } from 'class-transformer';

export class StaffMember {
  id = -getUniqueId();
  name = '';
  lastname = '';
  email = '';
  role = Roles.ASSISTANT;
  phone = '';

  @Type(() => Privileges)
  privileges = new Privileges();
}
