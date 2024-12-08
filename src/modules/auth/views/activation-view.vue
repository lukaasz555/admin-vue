<template>
  <div class="auth-view-container">
    <AuthLoader
      :is-visible="sendActivationTokenMutation.isPending.value"
    />
    <div
      v-if="sendActivationTokenMutation.isError.value"
      class="auth-view-container--error"
    >
      <v-icon>mdi-alert-circle</v-icon>
      {{ errorMessage }}
    </div>
    <div
      v-if="sendActivationTokenMutation.isSuccess.value"
      class="auth-view-container--success"
    >
      <header class="d-flex justify-center align-center">
        <v-icon :size="28">mdi-check-circle</v-icon>
        <h3>{{ $t('Your account is active') }}</h3>
      </header>

      <p class="text text-center mt-5 mb-3">
        {{
          $t('New password redirection', { secondsLeftToRedirect })
        }}
      </p>
      <p class="text text-center">
        <router-link class="text--link" :to="AuthRoutesNames.LOGIN">{{
          $t('Click here')
        }}</router-link>
        {{ $t('to see form now') }}
      </p>
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
const secondsLeftToRedirect = ref(6);
let secondsToRedirectInterval: ReturnType<typeof setInterval>;

const sendActivationTokenMutation = useMutation({
  mutationFn: (token: string) => authService.activateAccount(token),
  onSuccess: () => {
    startCounterAndRedirect();
  },
  onError: (err) => {
    startCounterAndRedirect();
    if (err instanceof AxiosError) {
      errorMessage.value =
        err.response?.data?.message ??
        i18n.global.t('Something went wrong');
    } else {
      errorMessage.value = i18n.global.t('Something went wrong');
    }
  },
});

function startCounterAndRedirect() {
  secondsToRedirectInterval = setInterval(() => {
    secondsLeftToRedirect.value -= 1;
    if (secondsLeftToRedirect.value === 0) {
      clearInterval(secondsToRedirectInterval);
      router.push({ name: AuthRoutesNames.CHANGE_PASSWORD });
    }
  }, 1000);
}

onMounted(() => {
  const { token } = getQueryValues(['token']);
  if (token) {
    sendActivationTokenMutation.mutate(token);
  }
});

onUnmounted(() => {
  clearInterval(secondsToRedirectInterval);
});
</script>
