import { getUniqueId } from '@/global/helpers/get-unique-id';

export class StaffData {
  id = -getUniqueId();
  name = '';
  lastname = '';
  email = '';
  phoneNumber = '';
}
