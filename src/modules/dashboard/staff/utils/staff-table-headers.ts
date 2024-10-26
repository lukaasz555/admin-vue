import { TableHeader } from '@/global/interfaces/table-header';
import { StaffMember } from '../models/staff-member';

export const staffTableHeaders: TableHeader<StaffMember>[] = [
  {
    align: 'start',
    key: 'name',
    title: 'Member',
    // temp. Record<string, any> is used to avoid type errors
    value: (staffMember: Record<string, any>) =>
      `${staffMember.name} ${staffMember.lastname}`,
  },
  {
    align: 'start',
    key: 'role',
    title: 'Role',
  },
  {
    align: 'end',
    key: 'actions',
    title: 'Actions',
    width: 100,
  },
];
