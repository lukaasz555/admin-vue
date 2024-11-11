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

type StaffPopupEmits = {
  (e: 'close'): void;
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

async function onConfirm(staffData: StaffData): Promise<void> {
  if (props.actionType === ActionType.ADD) {
    return staffService.createStaff(staffData);
  }
  if (props.actionType === ActionType.EDIT) {
    return staffService.editStaff(staffData);
  }
}
</script>
