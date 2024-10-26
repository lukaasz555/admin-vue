import { StaffMember } from '../models/staff-member';
import { getData } from '@/global/service/get-data';

export async function getStaffMembers(): Promise<StaffMember[]> {
  return getData<StaffMember[]>('staffMembers');
}
