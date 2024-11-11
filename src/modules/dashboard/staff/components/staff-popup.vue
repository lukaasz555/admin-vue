<template>
  <StaffForm
    :action-type="actionType"
    :staff-id="staffId"
    @cancel="emit('close')"
    @confirm="onConfirm"
  />
</template>

<script setup lang="ts">
import { staffService } from '../service/staff.service';
import { StaffData } from '../models/staff-data';
import StaffForm from './staff-form.vue';
import { ActionType } from '../../enums/action-type.enum';
import { useMutation } from '@tanstack/vue-query';
import { useGlobalStore } from '@/global/store/global.store';
import { Message } from '@/global/models/message';
import { MessageType } from '@/global/enums/message-type.enum';
import { TranslateResult } from 'vue-i18n';
import i18n from '@/plugins/i18n';

type StaffPopupEmits = {
  (e: 'close'): void;
  (e: 'refetch'): void;
};

const emit = defineEmits<StaffPopupEmits>();

const props = defineProps({
  staffId: {
    type: Number,
    required: true,
  },
  actionType: {
    type: String as PropType<ActionType>,
    default: ActionType.ADD,
  },
});

const globalStore = useGlobalStore();
function handleSuccess(messageText: TranslateResult): void {
  const message = Message.getMessage(MessageType.SUCCESS);
  message.content = messageText;
  globalStore.addMessage(message);
  emit('refetch');
  emit('close');
}

const createStaffMutation = useMutation({
  mutationFn: (staffData: StaffData) =>
    staffService.createStaff(staffData),
  onSuccess: () => {
    handleSuccess(i18n.global.t('Member created'));
  },
});
const editStaffMutation = useMutation({
  mutationFn: (staffData: StaffData) =>
    staffService.editStaff(staffData),
  onSuccess: () => {
    handleSuccess(i18n.global.t('Member updated'));
  },
});

async function onConfirm(staffData: StaffData): Promise<void> {
  if (props.actionType === ActionType.ADD) {
    return createStaffMutation.mutate(staffData);
  }
  if (props.actionType === ActionType.EDIT) {
    return editStaffMutation.mutate(staffData);
  }
}
</script>
