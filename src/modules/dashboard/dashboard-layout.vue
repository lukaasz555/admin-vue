<template>
  <AppBar @click="toggleDrawerVisibility" />
  <NavigationDrawer
    :is-open="isDrawerVisible"
    @update:is-open="isDrawerVisible = $event"
  />
  <div class="js-main-view">
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
const { isVisible, closeDialog, onConfirm } = useDialog();

function confirmDialog() {
  onConfirm.value();
  closeDialog();
}

function toggleDrawerVisibility() {
  isDrawerVisible.value = !isDrawerVisible.value;
}
</script>
