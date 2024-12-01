<template>
  <div>
    <form class="form" @submit.prevent="handleConfirm">
      <Input
        v-model="email"
        :error-message="errors.email"
        :label="$t('Email')"
      />
      <Input
        v-model="password"
        :error-message="errors.password"
        :label="$t('Password')"
        type="password"
      />
      <Button
        class="mt-5"
        :is-loading="isLoading"
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
import { loginFormSchema as validationSchema } from '../utils/schemas';
import { useField, useForm } from 'vee-validate';
import { AuthRoutesNames } from '../enums/auth-routes-names.enum';
import { LoginData } from '../viewModels/login-data';
import router from '@/plugins/router';
import Button from '@/global/components/button.vue';
import Input from '@/global/components/input.vue';

const emit = defineEmits<{
  (e: 'confirm', loginData: LoginData): void;
}>();

defineProps({
  isLoading: { type: Boolean, default: false },
});

const { handleSubmit, errors } = useForm({
  validationSchema,
});

const { value: email } = useField<string>('email');
const { value: password } = useField<string>('password');

const handleConfirm = handleSubmit(async ({ password, email }) => {
  const loginData = new LoginData(email, password);
  emit('confirm', loginData);
});

function onForgotPassword(): void {
  router.push({ name: AuthRoutesNames.FORGOT_PASSWORD });
}
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
</style>
