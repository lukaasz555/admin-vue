<template>
  <div class="view-container">
    <AuthLoader :is-visible="true" />
  </div>
</template>

<script setup lang="ts">
import { getQueryValues } from '@/global/helpers/get-query-values';
import { useMutation } from '@tanstack/vue-query';
import { authService } from '../service/auth.service';
import AuthLoader from '../components/auth-loader.vue';
import router from '@/plugins/router';
import { AuthRoutesNames } from '../enums/auth-routes-names.enum';

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

<style scoped lang="scss">
/* TODO add common class for auth-view-container  */
.view-container {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  &--error {
    color: $color-error;
  }
}
</style>
