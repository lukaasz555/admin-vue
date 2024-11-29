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
        :is-loading="isLoading"
        :label="$t('Reset password')"
        type="submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { forgotPasswordSchema } from '../schemas/forgot-password.schema';
import { ForgotPasswordData } from '../viewModels/forgot-password-data';
import { useValidation } from '@/global/composables/useValidation';
import Button from '@/global/components/button.vue';
import Input from '@/global/components/input.vue';

const emit = defineEmits<{
  (e: 'confirm', forgotPasswordData: ForgotPasswordData): void;
}>();

defineProps({
  isLoading: { type: Boolean, default: false },
});

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
