<template>
  <ForgotPasswordForm
    :is-loading="isPending"
    @confirm="handleForgotPassword"
  />
</template>

<script setup lang="ts">
import { useMutation } from '@tanstack/vue-query';
import ForgotPasswordForm from '../components/forgot-password-form.vue';
import { authService } from '../service/auth.service';
import { ForgotPasswordData } from '../viewModels/forgot-password-data';
import { useGlobalStore } from '@/global/store/global.store';
import i18n from '@/plugins/i18n';
import { MessageType } from '@/global/enums/message-type.enum';
import { Message } from '@/global/models/message';

const globalStore = useGlobalStore();

function handleForgotPassword(data: ForgotPasswordData): void {
  mutate(data);
}

const { isPending, mutate } = useMutation({
  mutationFn: (data: ForgotPasswordData) =>
    authService.resetPassword(data),
  onSuccess: (data) => {
    const message = Message.getMessage(
      MessageType.SUCCESS,
      i18n.global.t('Password reset email sent'),
    );
    globalStore.addMessage(message);
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
