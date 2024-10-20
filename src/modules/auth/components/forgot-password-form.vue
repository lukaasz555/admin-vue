<template>
  <div class="form__wrapper">
    <form @submit.prevent="handleConfirm">
      <Input
        v-model="forgotPasswordData.email"
        :errors="getError('email')"
        :label="$t('Email')"
      />
      <Button
        class="mb-1"
        :is-disabled="!isValid"
        :label="$t('Reset password')"
        type="submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { ForgotPasswordData } from '../viewModels/forgot-password-data';
import Input from '@/global/components/input.vue';
import Button from '@/global/components/button.vue';
import { useValidation } from '@/global/composables/useValidation';
import { forgotPasswordSchema } from '../schemas/forgot-password.schema';

const emit = defineEmits<{
  (e: 'confirm', forgotPasswordData: ForgotPasswordData): void;
}>();

const forgotPasswordData = ref(new ForgotPasswordData());

function handleConfirm(): void {
  if (isValid.value) {
    emit('confirm', forgotPasswordData.value);
  }
}

const { isValid, getError } = useValidation(
  forgotPasswordSchema,
  forgotPasswordData,
);
</script>
