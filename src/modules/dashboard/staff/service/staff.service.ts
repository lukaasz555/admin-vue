import { plainToInstance } from 'class-transformer';
import { StaffMember } from '../models/staff-member';
import { getData } from '@/global/service/get-data';

export async function getStaffMembers(): Promise<StaffMember[]> {
  const staffMembers = await getData<StaffMember[]>('staffMembers');
  return plainToInstance(StaffMember, staffMembers);
}
