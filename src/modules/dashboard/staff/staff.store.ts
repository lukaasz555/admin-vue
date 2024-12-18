import { defineStore } from 'pinia';
import { StaffMember } from './models/staff-member';

interface StaffStoreState {
  staffMembers: StaffMember[];
}

const baseState = (): StaffStoreState => ({
  staffMembers: [],
});

export const useStaffStore = defineStore('staffStore', {
  state: baseState,
  actions: {
    getMember(id: number) {
      return this.staffMembers.find((member) => member.id === id);
    },
  },
});
