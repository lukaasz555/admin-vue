<template>
  <form>
    <Input
      v-model="staffData.name"
      :error-message="getErrorMessage('name')"
      :label="$t('Name')"
    />
    <Input
      v-model="staffData.lastname"
      :error-message="getErrorMessage('lastname')"
      :label="$t('Last name')"
    />
    <Input
      v-model="staffData.email"
      :error-message="getErrorMessage('email')"
      :label="$t('Email')"
    />
    <Input
      v-model="staffData.phoneNumber"
      :error-message="getErrorMessage('phoneNumber')"
      :label="$t('Phone number')"
    />
    <RoleSelect
      v-if="canEditStaffRole"
      :current-role="staffData.role"
      @update="staffData.role = $event"
    />
  </form>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, PropType } from 'vue';
import { StaffData } from '../models/staff-data';
import { staffSchema } from '../utils/staff-form-schema';
import { ActionType } from '../../enums/action-type.enum';
import { useStaffStore } from '../staff.store';
import RoleSelect from './role-select.vue';
import Input from '@/global/components/input.vue';

const props = defineProps({
  staffId: {
    type: Number,
    required: true,
  },
  actionType: {
    type: String as PropType<ActionType>,
    default: ActionType.ADD,
  },
  canEditStaffRole: {
    type: Boolean,
    default: false,
  },
});

const staffStore = useStaffStore();
const staffData = ref(new StaffData());
const errors = ref<Record<string, string>>({});

onMounted(() => {
  if (props.actionType === ActionType.EDIT) {
    const member = staffStore.getMember(props.staffId);
    if (member) {
      staffData.value.setData(member);
    }
  }
});

onUnmounted(() => {
  staffData.value = new StaffData();
});

function getErrorMessage(key: keyof StaffData): string {
  return errors.value[key] || '';
}

function resetForm(): void {
  staffData.value = new StaffData();
}

function getStaffData(): StaffData {
  return staffData.value;
}

function validateForm(): boolean {
  const result = staffSchema.safeParse(staffData.value);
  if (result.success) {
    errors.value = {};
    return true;
  } else {
    errors.value = {};
    result.error.issues.forEach((issue) => {
      if (issue.path.length) {
        const field = issue.path[0] as string;
        errors.value[field] = issue.message;
      }
    });
    return false;
  }
}

defineExpose({ validateForm, getStaffData, resetForm });
</script>
