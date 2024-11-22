<template>
  <ActionBar
    :search-query="searchQuery"
    @add-staff="openStaffForm(ActionType.ADD)"
    @update="updateSearchQuery"
  />
  <StaffDataTable
    :staff-members="filteredStaffMembers"
    @delete-staff="deleteStaffHandler"
    @edit-staff="openStaffForm(ActionType.EDIT, $event)"
  />
  <Loader
    :is-loading="
      getStaffMembersQuery.isLoading.value ||
      deleteStaffMemberMutation.isPending.value
    "
  />
  <Popup
    v-model="isStaffFormVisible"
    :title="popupTitle"
    @close="closeStaffForm"
  >
    <StaffPopup
      :action-type="popupType"
      :staff-id="selectedStaffId"
      @close="closeStaffForm"
      @refetch="getStaffMembersQuery.refetch"
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
import { staffQueryKeys } from './utils/staff.query-keys';
import { staffService } from './service/staff.service';
import { ActionType } from '../enums/action-type.enum';
import { Message } from '@/global/models/message';
import StaffPopup from './components/staff-popup.vue';
import ActionBar from './components/action-bar.vue';
import Loader from '../components/loader.vue';
import Popup from '@/global/components/popup.vue';
import i18n from '@/plugins/i18n';
import Fuse from 'fuse.js';

const globalStore = useGlobalStore();
const staffStore = useStaffStore();
const isStaffFormVisible = ref(false);
const selectedStaffId = ref(0);
const popupType = ref(ActionType.ADD);
const searchQuery = ref('');

const popupTitle = computed(() =>
  popupType.value === ActionType.EDIT
    ? i18n.global.t('Edit staff')
    : i18n.global.t('Add staff'),
);

const getStaffMembersQuery = useQuery({
  queryKey: [staffQueryKeys.GET_STAFF_MEMBERS],
  queryFn: async () => {
    const res = await staffService.getStaffMembers();
    staffStore.staffMembers = res;
    fuse.setCollection(res);
    return res;
  },
});

const deleteStaffMemberMutation = useMutation({
  mutationFn: (staffId: number) => staffService.deleteMember(staffId),
  onSuccess: async () => {
    const message = Message.getMessage(MessageType.SUCCESS);
    message.content = i18n.global.t('Staff member deleted');
    globalStore.addMessage(message);
    staffStore.staffMembers = await staffService.getStaffMembers();
  },
});

function openStaffForm(type: ActionType, staffId = 0) {
  isStaffFormVisible.value = true;
  selectedStaffId.value = staffId;
  popupType.value = type;
}

function closeStaffForm(): void {
  isStaffFormVisible.value = false;
}

function updateSearchQuery(value: string): void {
  searchQuery.value = value;
}

function deleteStaffHandler(staffId: number): void {
  const { openDialog } = useDialog();

  const dialogOptions: IDialogOptions = {
    title: i18n.global.t('Delete staff member'),
    message: i18n.global.t(
      'Are you sure you want to delete this staff member?',
    ),
    onConfirm: () => deleteStaffMemberMutation.mutate(staffId),
    type: DialogTypeEnum.DELETE,
    confirmButtonText: i18n.global.t('Delete'),
  };

  openDialog(dialogOptions);
}

const minLengthToSearch = 3;

const fuse = new Fuse(staffStore.staffMembers, {
  includeScore: true,
  minMatchCharLength: minLengthToSearch,
  shouldSort: false,
  threshold: 0.4,
  keys: ['fullName', 'email'],
});

const filteredStaffMembers = computed(() => {
  if (searchQuery.value.length < minLengthToSearch) {
    return staffStore.staffMembers;
  }

  return fuse.search(searchQuery.value).map((result) => result.item);
});
</script>
