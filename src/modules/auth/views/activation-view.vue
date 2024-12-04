<template>
  <div class="auth-view-container">
    <AuthLoader :is-visible="true" />
  </div>
</template>

<script setup lang="ts">
import { AuthRoutesNames } from '../enums/auth-routes-names.enum';
import { getQueryValues } from '@/global/helpers/get-query-values';
import { useMutation } from '@tanstack/vue-query';
import { authService } from '../service/auth.service';
import AuthLoader from '../components/auth-loader.vue';
import router from '@/plugins/router';

const sendActivationTokenMutation = useMutation({
  mutationFn: (token: string) => authService.activateAccount(token),
  onSuccess: () => {
    router.push({ name: AuthRoutesNames.CHANGE_PASSWORD });
  },
});

onMounted(() => {
  const { token } = getQueryValues(['token']);
  if (token) {
    sendActivationTokenMutation.mutate(token);
  }
});
</script>
