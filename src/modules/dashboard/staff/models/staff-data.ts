import { getUniqueId } from '@/global/helpers/get-unique-id';
import { StaffMember } from './staff-member';
import { Roles } from '@/global/enums/roles.enum';

export class StaffData {
  id = -getUniqueId();
  name = '';
  lastname = '';
  email = '';
  phone = '';
  role = Roles.ASSISTANT;

  setData(data: StaffMember) {
    this.id = data.id;
    this.name = data.name;
    this.lastname = data.lastname;
    this.email = data.email;
    this.phone = data.phone;
    this.role = data.role;
  }

  setName(name: string): this {
    this.name = name;
    return this;
  }

  setLastname(lastname: string): this {
    this.lastname = lastname;
    return this;
  }

  setEmail(email: string): this {
    this.email = email;
    return this;
  }

  setPhone(phone: string): this {
    this.phone = phone;
    return this;
  }

  setRole(role: Roles): this {
    this.role = role;
    return this;
  }

  setId(id: number): this {
    this.id = id;
    return this;
  }
}
