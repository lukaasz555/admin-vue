<template>
  <ForgotPasswordForm @confirm="handleForgotPassword" />
</template>

<script setup lang="ts">
import ForgotPasswordForm from '../components/forgot-password-form.vue';
import { ForgotPasswordData } from '../viewModels/forgot-password-data';

function handleForgotPassword(
  forgotPasswordData: ForgotPasswordData,
): void {}
</script>
