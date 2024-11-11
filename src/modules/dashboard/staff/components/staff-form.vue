<template>
  <form @submit.prevent="handleConfirm">
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
    <div class="mt-5 d-flex justify-center">
      <Button
        :label="
          actionType === ActionType.ADD ? $t('Add') : $t('Edit')
        "
        type="submit"
      />
      <Button
        :label="$t('Cancel')"
        variant="text"
        @click="handleCancel"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, PropType } from 'vue';
import { StaffData } from '../models/staff-data';
import { staffSchema } from '../utils/staff-form-schema';
import Button from '@/global/components/button.vue';
import Input from '@/global/components/input.vue';
import { ActionType } from '../../enums/action-type.enum';
import { useStaffStore } from '../staff.store';

type StaffFormEmits = {
  (e: 'confirm', staffData: StaffData): void;
  (e: 'cancel'): void;
};
const emit = defineEmits<StaffFormEmits>();

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

const staffStore = useStaffStore();
const staffData = ref(new StaffData());
const errors = ref<Record<string, string>>({});

function handleConfirm(): void {
  const isValidForm = validateForm();
  if (!isValidForm) return;
  emit('confirm', staffData.value);
}

function handleCancel(): void {
  staffData.value = new StaffData();
  emit('cancel');
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

function getErrorMessage(key: keyof StaffData): string {
  return errors.value[key] || '';
}

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
</script>
