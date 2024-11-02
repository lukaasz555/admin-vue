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
    <Button class="mt-5" :label="$t('Add')" type="submit" />
  </form>
</template>

<script setup lang="ts">
import { StaffData } from '../models/staff-data';
import { staffSchema } from '../utils/staff-form-schema';
import Button from '@/global/components/button.vue';
import Input from '@/global/components/input.vue';

type StaffFormEmits = {
  (e: 'confirm', staffData: StaffData): void;
};

const emit = defineEmits<StaffFormEmits>();

const staffData = ref(new StaffData());
const errors = ref<Record<string, string>>({});

const handleConfirm = () => {
  const isValidForm = validateForm();
  if (!isValidForm) return;

  emit('confirm', staffData.value);
};

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
</script>
