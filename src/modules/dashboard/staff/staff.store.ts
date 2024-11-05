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
  actions: {},
});
