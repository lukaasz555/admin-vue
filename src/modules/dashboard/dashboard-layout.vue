<template>
  <AppBar @click="toggleDrawerVisibility" />
  <NavigationDrawer
    :is-open="isDrawerVisible"
    @update:is-open="isDrawerVisible = $event"
  />
  <div class="main-view--container">
    <router-view />
  </div>
</template>

<script setup lang="ts">
import AppBar from './components/app-bar.vue';
import NavigationDrawer from './components/navigation-drawer.vue';

const isDrawerVisible = ref(false);

function toggleDrawerVisibility() {
  console.log('toggleDrawerVisibility invoked');
  isDrawerVisible.value = !isDrawerVisible.value;
}
</script>
