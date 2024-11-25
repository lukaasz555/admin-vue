<template>
  <EmailPasswordMessage
    v-if="passwordEmail.isSent"
    :email="passwordEmail.email"
  />
  <ForgotPasswordForm
    v-else
    :is-loading="isPending"
    @confirm="handleForgotPassword"
  />
</template>

<script setup lang="ts">
import { ForgotPasswordData } from '../viewModels/forgot-password-data';
import { useGlobalStore } from '@/global/store/global.store';
import { useMutation } from '@tanstack/vue-query';
import { authService } from '../service/auth.service';
import { MessageType } from '@/global/enums/message-type.enum';
import { Message } from '@/global/models/message';
import EmailPasswordMessage from '../components/email-password-message.vue';
import ForgotPasswordForm from '../components/forgot-password-form.vue';
import i18n from '@/plugins/i18n';

const globalStore = useGlobalStore();
const passwordEmail = ref({
  isSent: false,
  email: '',
});

function handleForgotPassword(data: ForgotPasswordData): void {
  passwordEmail.value.email = data.email;
  mutate(data);
}

const { isPending, mutate } = useMutation({
  mutationFn: (data: ForgotPasswordData) =>
    authService.resetPassword(data),
  onSuccess: (data) => {
    passwordEmail.value.isSent = true;
    return data;
  },
  onError: () => {
    const message = Message.getMessage(
      MessageType.ERROR,
      i18n.global.t('Something went wrong'),
    );
    globalStore.addMessage(message);
  },
});
</script>
