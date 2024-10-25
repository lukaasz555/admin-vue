<template>
  <div>
    <form class="form" @submit.prevent="handleConfirm">
      <Input
        v-model="loginData.email"
        :label="$t('Email')"
        :rules="loginData.rules.email"
      />
      <Input
        v-model="loginData.password"
        :label="$t('Password')"
        :rules="loginData.rules.password"
        type="password"
      />
      <Button
        class="mt-5"
        :is-disabled="!loginData.isValid"
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
import { watch } from 'vue';
import { AuthRoutesNames } from '../enums/auth-routes-names.enum';
import { LoginData } from '../viewModels/login-data';
import Input from '@/global/components/input.vue';
import Button from '@/global/components/button.vue';
import router from '@/plugins/router';

const emit = defineEmits<{
  (e: 'confirm', loginData: LoginData): void;
}>();

defineProps({
  isLoading: { type: Boolean, default: false },
});

function handleConfirm(): void {
  emit('confirm', loginData.value);
}

function onForgotPassword(): void {
  router.push({ name: AuthRoutesNames.FORGOT_PASSWORD });
}

const loginData = ref(new LoginData());

watch(
  [() => loginData.value.email, () => loginData.value.password],
  () => loginData.value.validate(),
  { immediate: true },
);
</script>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  row-gap: 16px;
}
</style>
