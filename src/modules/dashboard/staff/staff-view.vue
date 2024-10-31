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
import { useGlobalStore } from '@/global/store/global.store';
import { MessageType } from '@/global/enums/message-type.enum';
import { useDialog } from '@/global/composables/useDialog';
import { Message } from '@/global/models/message';
import Loader from '../components/loader.vue';
import i18n from '@/plugins/i18n';
import { DialogTypeEnum } from '@/global/enums/dialog-type.enum';

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
    message.content = i18n.global.t('Staff member deleted');
    globalStore.addMessage(message);
    staffStore.staffMembers = await getStaffMembers();
  },
});

const deleteDialogData = {
  title: i18n.global.t('Delete staff member'),
  message: i18n.global.t(
    'Are you sure you want to delete this staff member?',
  ),
};

function deleteStaffHandler(staffId: number): void {
  const { openDialog } = useDialog();
  openDialog(
    deleteDialogData.title,
    deleteDialogData.message,
    () => mutate(staffId),
    DialogTypeEnum.DELETE,
  );
}
</script>
