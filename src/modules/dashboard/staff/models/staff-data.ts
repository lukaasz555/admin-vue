import { getUniqueId } from '@/global/helpers/get-unique-id';
import { StaffMember } from './staff-member';

export class StaffData {
  id = -getUniqueId();
  name = '';
  lastname = '';
  email = '';
  phoneNumber = '';

  setData(data: StaffMember) {
    this.id = data.id;
    this.name = data.name;
    this.lastname = data.lastname;
    this.email = data.email;
    this.phoneNumber = data.phone;
  }
}
