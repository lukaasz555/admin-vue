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
import { useQuery } from '@tanstack/vue-query';
import { dashboardService } from './service/dashboard.service';
import { useGlobalStore } from '@/global/store/global.store';
import ConfirmationDialog from './components/confirmation-dialog.vue';
import NavigationDrawer from './components/navigation-drawer.vue';
import AppBar from './components/app-bar.vue';
import { dashboardQueryKeys } from './dashboard.query-keys';

const isDrawerVisible = ref(false);
const { isVisible, closeDialog, onConfirm } = useDialog();

function confirmDialog() {
  onConfirm.value();
  closeDialog();
}

function toggleDrawerVisibility() {
  isDrawerVisible.value = !isDrawerVisible.value;
}

useQuery({
  queryKey: [dashboardQueryKeys.GET_PRIVILEGES_LIMITS],
  queryFn: async () => {
    const limits = await dashboardService.getPrivilegesLimits();
    useGlobalStore().setPrivilegeLimits(limits);
    return limits;
  },
});
</script>
