<template>
  <v-navigation-drawer
    ref="navigationDrawer"
    v-model="isDrawerVisible"
    temporary
  >
    <DrawerNavigationMenuItems />
    <v-divider></v-divider>
    <LanguageChooser />
    <Button
      is-full-width
      :label="$t('Logout')"
      @click="handleLogout"
    />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
import { useUserStore } from '@/global/store/user.store';
import { useDialog } from '@/global/composables/useDialog';
import DrawerNavigationMenuItems from './drawer-navigation-menu-items.vue';
import LanguageChooser from '@/global/components/language-chooser.vue';
import Button from '@/global/components/button.vue';

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
  const isMainViewClicked = !!target.closest('.main-view--container');
  if (isMainViewClicked) {
    emit('update:isOpen', false);
  }
});

const { openDialog, closeDialog } = useDialog();

function handleLogout(): void {
  openDialog('Logout', 'Are you sure you want to logout?', () => {
    userStore.logout();
    closeDialog();
  });
}
</script>
