<template>
  <ForgotPasswordForm @confirm="handleForgotPassword" />
</template>

<script setup lang="ts">
import ForgotPasswordForm from '../components/forgot-password-form.vue';

function handleForgotPassword(): void {}
</script>
