<template>
  <ActionBar
    :search-query="searchQuery"
    @add-staff="addStaffHandler"
    @update="updateSearchQuery"
  />
  <StaffDataTable
    :staff-members="filteredStaffMembers"
    @delete-staff="deleteStaffHandler"
    @edit-staff="editStaffHandler"
  />
  <Loader :is-loading="isLoading || isPending" />
  <Popup
    v-model="isStaffFormVisible"
    :title="
      popupType === ActionType.EDIT
        ? $t('Edit staff')
        : $t('Add staff')
    "
    @close="isStaffFormVisible = false"
  >
    <StaffPopup
      :action-type="popupType"
      :staff-id="selectedStaffId"
    />
  </Popup>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from '@tanstack/vue-query';
import StaffDataTable from './components/staff-data-table.vue';
import { useStaffStore } from './staff.store';
import { useGlobalStore } from '@/global/store/global.store';
import { MessageType } from '@/global/enums/message-type.enum';
import {
  IDialogOptions,
  useDialog,
} from '@/global/composables/useDialog';
import { DialogTypeEnum } from '@/global/enums/dialog-type.enum';
import { Message } from '@/global/models/message';
import { staffService } from './service/staff.service';
import { ActionType } from '../enums/action-type.enum';
import StaffPopup from './components/staff-popup.vue';
import Loader from '../components/loader.vue';
import Popup from '@/global/components/popup.vue';
import i18n from '@/plugins/i18n';
import ActionBar from './components/action-bar.vue';
import Fuse from 'fuse.js';

const globalStore = useGlobalStore();
const staffStore = useStaffStore();
const isStaffFormVisible = ref(false);
const selectedStaffId = ref(0);
const popupType = ref(ActionType.ADD);
const searchQuery = ref('');

const { isLoading } = useQuery({
  queryKey: ['getStaffMembers'],
  queryFn: async () => {
    const res = await staffService.getStaffMembers();
    staffStore.staffMembers = res;
    fuse.setCollection(res);
    return res;
  },
});

const { isPending, mutate } = useMutation({
  mutationFn: (staffId: number) => staffService.deleteMember(staffId),
  onSuccess: async () => {
    const message = Message.getMessage(MessageType.SUCCESS);
    message.content = i18n.global.t('Staff member deleted');
    globalStore.addMessage(message);
    staffStore.staffMembers = await staffService.getStaffMembers();
  },
});

function editStaffHandler(staffId: number): void {
  isStaffFormVisible.value = true;
  selectedStaffId.value = staffId;
  popupType.value = ActionType.EDIT;
}

function updateSearchQuery(value: string): void {
  searchQuery.value = value;
}

function addStaffHandler(): void {
  isStaffFormVisible.value = true;
  selectedStaffId.value = 0;
  popupType.value = ActionType.ADD;
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

const fuse = new Fuse(staffStore.staffMembers, {
  includeScore: true,
  minMatchCharLength: 3,
  shouldSort: false,
  threshold: 0.3,
  keys: ['name', 'lastname', 'email'],
});

const filteredStaffMembers = computed(() => {
  if (!searchQuery.value) return staffStore.staffMembers;

  const res = fuse
    .search(searchQuery.value)
    .map((result) => result.item);
  return res;
});
</script>
