<template>
  <LoginForm :is-loading="isPending" @confirm="handleLogin" />
</template>

<script setup lang="ts">
import LoginForm from '../components/login-form.vue';
import { LoginData } from '../viewModels/login-data';
import { useMutation } from '@tanstack/vue-query';
import { login } from '../service/auth.service';
import { useUserStore } from '@/global/store/user.store';
import { DashboardRoutesNames } from '@/modules/dashboard/enums/dashboard-routes-names.enum';
import { Message } from '@/global/models/message';
import { useGlobalStore } from '@/global/store/global.store';
import router from '@/plugins/router';

const globalStore = useGlobalStore();
const userStore = useUserStore();

const { isPending, mutate } = useMutation({
  mutationFn: (data: LoginData) => login(data),
  onSuccess: (data) => {
    userStore.setUserWithToken(data);
    handleLoginSuccess();
    router.push({
      name: DashboardRoutesNames.DASHBOARD,
    });
  },
});

async function handleLogin(loginData: LoginData): Promise<void> {
  mutate(loginData);
}

function handleLoginSuccess(): void {
  const message = Message.getSuccessMessage();
  message.content = 'Login successful';
  globalStore.addMessage(message);
}
</script>
