<template>
  <ChangePasswordForm @confirm="handlePasswordChange" />
</template>

<script setup lang="ts">
import { ChangePasswordData } from '../viewModels/change-password-data';
import { AuthRoutesNames } from '../enums/auth-routes-names.enum';
import { useGlobalStore } from '@/global/store/global.store';
import { useMutation } from '@tanstack/vue-query';
import { authService } from '../service/auth.service';
import { MessageType } from '@/global/enums/message-type.enum';
import { Message } from '@/global/models/message';
import ChangePasswordForm from '../components/change-password-form.vue';
import router from '@/plugins/router';
import i18n from '@/plugins/i18n';

const changePasswordMutation = useMutation({
  mutationFn: (data: ChangePasswordData) => {
    return authService.changePassword(data);
  },
  onSuccess: () => {
    useGlobalStore().addMessage(
      Message.getMessage(
        MessageType.SUCCESS,
        i18n.global.t('Password changed successfully'),
      ),
    );
    router.push({ name: AuthRoutesNames.LOGIN });
  },
});

function handlePasswordChange(data: ChangePasswordData): void {
  changePasswordMutation.mutate(data);
}
</script>
