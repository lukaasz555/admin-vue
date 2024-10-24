<template>
  <AppBar @click="toggleDrawerVisibility" />
  <NavigationDrawer
    :is-open="isDrawerVisible"
    @update:is-open="isDrawerVisible = $event"
  />
  <div class="main-view--container">
    <router-view />
  </div>
  <ConfirmationDialog
    v-model="isVisible"
    @close="closeDialog"
    @confirm="confirmDialog"
  />
</template>

<script setup lang="ts">
import { useDialog } from '@/global/composables/useDialog';
import AppBar from './components/app-bar.vue';
import NavigationDrawer from './components/navigation-drawer.vue';
import ConfirmationDialog from './components/confirmation-dialog.vue';

const isDrawerVisible = ref(false);

function toggleDrawerVisibility() {
  console.log('toggleDrawerVisibility invoked');
  isDrawerVisible.value = !isDrawerVisible.value;
}

const { isVisible, closeDialog, onConfirm } = useDialog();

function confirmDialog() {
  onConfirm.value();
  closeDialog();
}
</script>
