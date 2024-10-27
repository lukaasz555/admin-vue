<template>
  <div>
    <StaffDataTable @delete-staff="deleteStaffHandler" />
  </div>
  <Loader :is-loading="isLoading || isPending" />
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query';
import StaffDataTable from './components/staff-data-table.vue';
import {
  deleteMember,
  getStaffMembers,
} from './service/staff.service';
import { useStaffStore } from './staff.store';
import Loader from '../components/loader.vue';
import { useGlobalStore } from '@/global/store/global.store';
import { Message } from '@/global/models/message';
import { MessageType } from '@/global/enums/message-type.enum';

const globalStore = useGlobalStore();
const staffStore = useStaffStore();

const { isLoading } = useQuery({
  queryKey: ['getStaffMembers'],
  queryFn: async () => {
    const res = await getStaffMembers();
    staffStore.staffMembers = res;
    return res;
  },
});

const { isPending, mutate } = useMutation({
  mutationFn: (staffId: number) => deleteMember(staffId),
  onSuccess: async () => {
    const message = Message.getMessage(MessageType.SUCCESS);
    message.content = 'Staff member deleted';
    globalStore.addMessage(message);
    staffStore.staffMembers = await getStaffMembers();
  },
});

function deleteStaffHandler(staffId: number): void {
  mutate(staffId);
}
</script>
