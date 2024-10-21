<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
    <MessagesQueue />
  </v-app>
</template>

<script lang="ts" setup>
import MessagesQueue from './global/components/messages-queue.vue';
import { useUserStore } from './global/store/user.store';

const userStore = useUserStore();
userStore.getUserFromLS();
</script>
