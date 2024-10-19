<template>
  <div class="form__wrapper">
    <form @submit.prevent="handleConfirm">
      <Input
        v-model="loginData.email"
        :errors="getError('email')"
        :label="$t('Email')"
      />
      <Input
        v-model="loginData.password"
        :errors="getError('password')"
        :label="$t('Password')"
        type="password"
      />
      <Button
        class="mt-5"
        :is-disabled="!isValid"
        :label="$t('Login')"
        type="submit"
      />
    </form>
    <section class="d-flex justify-end">
      <Button
        :label="$t('Forgot password?')"
        size="x-small"
        variant="plain"
        @click="onForgotPassword"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { useValidation } from '@/global/composables/useValidation';
import Input from '@/global/components/input.vue';
import Button from '@/global/components/button.vue';
import { LoginData } from '../viewModels/login-data';
import { loginSchema } from '../schemas/login.schema';
import router from '@/plugins/router';
import { AuthRoutesNames } from '../enums/auth-routes-names.enum';

const emit = defineEmits<{
  (e: 'confirm', loginData: LoginData): void;
}>();

const loginData = ref(new LoginData());
const { isValid, getError } = useValidation(loginSchema, loginData);

function handleConfirm(): void {
  if (isValid.value) {
    emit('confirm', loginData.value);
  }
}

function onForgotPassword(): void {
  router.push({ name: AuthRoutesNames.FORGOT_PASSWORD });
}
</script>
