<template>
  <div>
    <StaffDataTable
      @delete-staff="deleteStaffHandler"
      @edit-staff="editStaffHandler"
    />
  </div>
  <Loader :is-loading="isLoading || isPending" />
  <Popup
    v-model="isStaffEditVisible"
    :title="$t('Edit staff')"
    @close="isStaffEditVisible = false"
  >
    <StaffPopup />
  </Popup>
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
import {
  IDialogOptions,
  useDialog,
} from '@/global/composables/useDialog';
import { DialogTypeEnum } from '@/global/enums/dialog-type.enum';
import { Message } from '@/global/models/message';
import StaffPopup from './components/staff-popup.vue';
import Loader from '../components/loader.vue';
import Popup from '@/global/components/popup.vue';
import i18n from '@/plugins/i18n';

const globalStore = useGlobalStore();
const staffStore = useStaffStore();
const isStaffEditVisible = ref(false);

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

function editStaffHandler(staffId: number): void {
  isStaffEditVisible.value = true;
  console.log('staffId = ', staffId);
}

function deleteStaffHandler(staffId: number): void {
  const { openDialog } = useDialog();

  const dialogOptions: IDialogOptions = {
    title: i18n.global.t('Delete staff member'),
    message: i18n.global.t(
      'Are you sure you want to delete this staff member?',
    ),
    onConfirm: () => mutate(staffId),
    type: DialogTypeEnum.DELETE,
    confirmButtonText: i18n.global.t('Delete'),
  };

  openDialog(dialogOptions);
}
</script>
