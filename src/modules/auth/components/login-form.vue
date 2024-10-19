<template>
  <form @submit.prevent="handleLogin">
    <Input
      v-model="loginForm.email"
      :errors="getError('email')"
      :label="$t('Email')"
    />
    <Input
      v-model="loginForm.password"
      :errors="getError('password')"
      :label="$t('Password')"
      type="password"
    />
    <Button
      :is-disabled="!isValid"
      :label="$t('Login')"
      type="submit"
    />
  </form>
</template>

<script setup lang="ts">
import { useValidation } from '@/global/composables/useValidation';
import Input from '@/global/components/input.vue';
import Button from '@/global/components/button.vue';
import { z } from 'zod';

async function handleLogin(): Promise<void> {
  if (isValid.value) {
    console.log('login...', loginForm.value);
  }
}

const loginSchema = z.object({
  email: z.string().max(64).email('Invalid email'),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(64, {
      message: 'Password must be at most 64 characters',
    }),
});

const loginForm = ref({
  email: '',
  password: '',
});

const { isValid, getError } = useValidation(loginSchema, loginForm);
</script>
