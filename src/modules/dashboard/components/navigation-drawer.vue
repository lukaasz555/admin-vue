<template>
  <v-navigation-drawer
    ref="navigationDrawer"
    v-model="isDrawerVisible"
    temporary
  >
    <DrawerNavigationMenuItems />
    <v-divider></v-divider>
    <LanguageChooser />
    <Button :label="$t('Logout')" @click="handleLogout" />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { useUserStore } from '@/global/store/user.store';
import {
  IDialogOptions,
  useDialog,
} from '@/global/composables/useDialog';
import DrawerNavigationMenuItems from './drawer-navigation-menu-items.vue';
import LanguageChooser from '@/global/components/language-chooser.vue';
import Button from '@/global/components/button.vue';
import i18n from '@/plugins/i18n';

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
}>();

const props = defineProps({
  isOpen: { type: Boolean, default: false },
});

const userStore = useUserStore();

const isDrawerVisible = computed({
  get: () => props.isOpen,
  set: (value) => emit('update:isOpen', value),
});

const navigationDrawer = ref<HTMLElement | null>(null);
onClickOutside(navigationDrawer, (e: MouseEvent) => {
  if (!e.target) return;

  const target = e.target as HTMLElement;
  const isMainViewClicked = !!target.closest('.js-main-view');
  if (isMainViewClicked) {
    emit('update:isOpen', false);
  }
});

const { openDialog, closeDialog } = useDialog();

function handleLogout(): void {
  const dialogOptions: IDialogOptions = {
    title: i18n.global.t('Logout'),
    onConfirm: () => {
      userStore.logout();
      closeDialog();
    },
  };

  openDialog(dialogOptions);
}
</script>
