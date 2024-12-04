<template>
  <div class="auth-view-container">
    <AuthLoader
      :is-visible="sendTokenMutation.isPending.value"
      :message="$t('Validating token')"
    />
    <div
      v-if="sendTokenMutation.isError.value"
      class="auth-view-container--error"
    >
      <v-icon>mdi-alert-circle</v-icon>
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { AuthRoutesNames } from '../enums/auth-routes-names.enum';
import { getQueryValues } from '@/global/helpers/get-query-values';
import { useMutation } from '@tanstack/vue-query';
import { authService } from '../service/auth.service';
import { AxiosError } from 'axios';
import AuthLoader from '../components/auth-loader.vue';
import router from '@/plugins/router';
import i18n from '@/plugins/i18n';

const errorMessage = ref('');

const sendTokenMutation = useMutation({
  mutationFn: (token: string) => authService.sendRecoveryToken(token),
  onSuccess: () => {
    router.push({ name: AuthRoutesNames.CHANGE_PASSWORD });
  },
  onError: (err) => {
    if (err instanceof AxiosError) {
      errorMessage.value =
        err.response?.data?.message ??
        i18n.global.t('Something went wrong');
    } else {
      errorMessage.value = i18n.global.t('Something went wrong');
    }
  },
});

onMounted(() => {
  const { token } = getQueryValues(['token']);
  if (token) {
    sendTokenMutation.mutate(token);
  }
});
</script>

<style scoped lang="scss">
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
