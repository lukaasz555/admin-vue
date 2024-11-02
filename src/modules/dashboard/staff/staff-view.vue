<template>
  <div>
    <!-- Temp. here - move to popup after KF-6 merge -->
    <StaffForm
      :form-action-type="staffFormAction"
      @confirm="onConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ActionType } from '../enums/action-type.enum';
import { StaffData } from './models/staff-data';
import { useMutation } from '@tanstack/vue-query';
import { Message } from '@/global/models/message';
import { MessageType } from '@/global/enums/message-type.enum';
import { useGlobalStore } from '@/global/store/global.store';
import { TranslateResult } from 'vue-i18n';
import { staffService } from './staff.service';
import StaffForm from './components/staff-form.vue';
import i18n from '@/plugins/i18n';

const globalStore = useGlobalStore();

const staffFormAction = ref(ActionType.ADD);

function openEditForm(): void {
  staffFormAction.value = ActionType.EDIT;
}

function openAddForm(): void {
  staffFormAction.value = ActionType.ADD;
}

function onConfirm(staffData: StaffData): void {
  mutate(staffData);
}

const { isPending, mutate } = useMutation({
  mutationFn: (data: StaffData) =>
    staffFormActionDetails.value.handler(data),
  onSuccess: () => {
    const message = Message.getMessage(MessageType.SUCCESS);
    message.content = staffFormActionDetails.value.successMessage;
    globalStore.addMessage(message);
  },
});

type StaffFormActionDetails = {
  handler: (staffData: StaffData) => Promise<void>;
  successMessage: TranslateResult;
};

const staffFormActionDetails = computed<StaffFormActionDetails>(
  () => {
    if (staffFormAction.value === ActionType.ADD) {
      return {
        handler: staffService.createStaff,
        successMessage: i18n.global.t(
          'Staff member added successfully',
        ),
      };
    } else {
      return {
        handler: staffService.editStaff,
        successMessage: i18n.global.t(
          'Staff member updated successfully',
        ),
      };
    }
  },
);
</script>
