import { plainToInstance } from 'class-transformer';
import { StaffMember } from '../models/staff-member';
import { getData } from '@/global/service/get-data';
import { deleteData } from '@/global/service/delete-data';

export async function getStaffMembers(): Promise<StaffMember[]> {
  const staffMembers = await getData<StaffMember[]>('staffMembers');
  return plainToInstance(StaffMember, staffMembers);
}

export async function deleteMember(staffId: number): Promise<void> {
  return deleteData(`staffMembers/${staffId}`);
}
