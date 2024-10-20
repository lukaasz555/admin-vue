<template>
  <LoginForm @confirm="handleLogin" />
</template>

<script setup lang="ts">
import LoginForm from '../components/login-form.vue';
import { LoginData } from '../viewModels/login-data';

async function handleLogin(loginData: LoginData): Promise<void> {
  console.log('login...', loginData);
}
</script>
