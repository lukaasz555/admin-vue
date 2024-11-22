<template>
  <LoginForm :is-loading="isPending" @confirm="handleLogin" />
</template>

<script setup lang="ts">
import LoginForm from '../components/login-form.vue';
import { LoginData } from '../viewModels/login-data';
import { useMutation } from '@tanstack/vue-query';
import { useUserStore } from '@/global/store/user.store';
import { DashboardRoutesNames } from '@/modules/dashboard/enums/dashboard-routes-names.enum';
import { Message } from '@/global/models/message';
import { useGlobalStore } from '@/global/store/global.store';
import { MessageType } from '@/global/enums/message-type.enum';
import { authService } from '../service/auth.service';
import router from '@/plugins/router';
import i18n from '@/plugins/i18n';

const globalStore = useGlobalStore();
const userStore = useUserStore();

const { isPending, mutate } = useMutation({
  mutationFn: (data: LoginData) => authService.login(data),
  onSuccess: (data) => {
    userStore.setUserWithToken(data);
    handleLoginSuccess();
  },
});

async function handleLogin(loginData: LoginData): Promise<void> {
  mutate(loginData);
}

function handleLoginSuccess(): void {
  const message = Message.getMessage(MessageType.SUCCESS);
  message.content = i18n.global.t('Login successful');
  globalStore.addMessage(message);
  router.push({
    name: DashboardRoutesNames.DASHBOARD,
  });
}
</script>
