<template>
  <div>
    <form class="form" @submit.prevent="handleConfirm">
      <Input
        v-model="changePasswordData.email"
        :label="$t('Email')"
        :rules="changePasswordData.rules.email"
      />
      <Input
        v-model="changePasswordData.newPassword"
        :label="$t('Password')"
        :rules="changePasswordData.rules.newPassword"
        type="password"
      />
      <Input
        v-model="changePasswordData.confirmPassword"
        :label="$t('Confirm password')"
        :rules="changePasswordData.rules.confirmPassword"
        type="password"
      />
      <Button
        class="mt-5"
        :is-disabled="!changePasswordData.isValid"
        :is-loading="isLoading"
        :label="$t('Submit')"
        type="submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ChangePasswordData } from '../viewModels/change-password-data';
import Button from '@/global/components/button.vue';
import Input from '@/global/components/input.vue';

type EmitType = {
  (e: 'confirm', changePasswordData: ChangePasswordData): void;
};

const emit = defineEmits<EmitType>();

defineProps({
  isLoading: { type: Boolean, default: false },
});

const changePasswordData = ref(new ChangePasswordData());

function handleConfirm(): void {
  emit('confirm', changePasswordData.value);
}

watch(
  () => changePasswordData.value,
  () => {
    changePasswordData.value.validate();
  },
  { immediate: true, deep: true },
);
</script>
