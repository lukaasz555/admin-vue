import { getUniqueId } from '@/global/helpers/get-unique-id';
import { StaffMember } from './staff-member';
import { Roles } from '@/global/enums/roles.enum';

export class StaffData {
  id = -getUniqueId();
  name = '';
  lastname = '';
  email = '';
  phoneNumber = '';
  role = Roles.ASSISTANT;

  setData(data: StaffMember) {
    this.id = data.id;
    this.name = data.name;
    this.lastname = data.lastname;
    this.email = data.email;
    this.phoneNumber = data.phone;
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

  setPhoneNumber(phoneNumber: string): this {
    this.phoneNumber = phoneNumber;
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
