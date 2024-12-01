<template>
  <div class="form__wrapper">
    <form @submit.prevent="onSubmit">
      <Input
        v-model="email"
        :error-message="errors.email"
        :label="$t('Email')"
      />
      <Button
        class="mb-1"
        :is-loading="isLoading"
        :label="$t('Reset password')"
        type="submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { forgotPasswordFormSchema as validationSchema } from '../utils/schemas';
import { ForgotPasswordData } from '../viewModels/forgot-password-data';
import { useField, useForm } from 'vee-validate';
import Button from '@/global/components/button.vue';
import Input from '@/global/components/input.vue';

const emit = defineEmits<{
  (e: 'confirm', forgotPasswordData: ForgotPasswordData): void;
}>();

defineProps({
  isLoading: { type: Boolean, default: false },
});

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: email } = useField<string>('email');

const onSubmit = handleSubmit(async ({ email }) => {
  const forgotPasswordData = new ForgotPasswordData(email);
  emit('confirm', forgotPasswordData);
});
</script>
