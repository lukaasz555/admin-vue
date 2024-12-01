<template>
  <div>
    <form class="form" @submit.prevent="handleConfirm">
      <Input
        v-model="email"
        :error-message="errors.email"
        :label="$t('Email')"
      />
      <Input
        v-model="newPassword"
        :error-message="errors.newPassword"
        :label="$t('Password')"
        type="password"
      />
      <Input
        v-model="confirmPassword"
        :error-message="errors.confirmPassword"
        :label="$t('Confirm password')"
        type="password"
      />
      <Button
        class="mt-5"
        :is-loading="isLoading"
        :label="$t('Submit')"
        type="submit"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import { changePasswordFormSchema as validationSchema } from '../utils/schemas';
import { ChangePasswordData } from '../viewModels/change-password-data';
import { useField, useForm } from 'vee-validate';
import Button from '@/global/components/button.vue';
import Input from '@/global/components/input.vue';

type EmitType = {
  (e: 'confirm', changePasswordData: ChangePasswordData): void;
};

const emit = defineEmits<EmitType>();

defineProps({
  isLoading: { type: Boolean, default: false },
});

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: email } = useField<string>('email');
const { value: newPassword } = useField<string>('newPassword');
const { value: confirmPassword } =
  useField<string>('confirmPassword');

const handleConfirm = handleSubmit(async ({ email, newPassword }) => {
  const changePasswordData = new ChangePasswordData(
    email,
    newPassword,
  );
  emit('confirm', changePasswordData);
});
</script>
