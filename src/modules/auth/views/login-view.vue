<template>
  <LoginForm @confirm="handleLogin" />
</template>

<script setup lang="ts">
import LoginForm from '../components/login-form.vue';
import { LoginData } from '../viewModels/login-data';
import { useMutation } from '@tanstack/vue-query';
import { login } from '../service/auth.service';
import { useUserStore } from '@/global/store/user.store';

const userStore = useUserStore();

const mutation = useMutation({
  mutationFn: (data: LoginData) => login(data),
  onSuccess: (data) => {
    userStore.setUserWithToken(data);
  },
});

async function handleLogin(loginData: LoginData): Promise<void> {
  mutation.mutate(loginData);
}
</script>
