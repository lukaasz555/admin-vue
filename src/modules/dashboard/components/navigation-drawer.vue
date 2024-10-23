<template>
  <v-navigation-drawer
    ref="navigationDrawer"
    v-model="isDrawerVisible"
    temporary
  >
    <v-list-item
      subtitle="Vuetify"
      title="My Application"
    ></v-list-item>
    <v-divider></v-divider>
    <v-list-item link title="List Item 1"></v-list-item>
    <v-list-item link title="List Item 2"></v-list-item>
    <v-list-item link title="List Item 3"></v-list-item>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void;
}>();

const props = defineProps({
  isOpen: { type: Boolean, default: false },
});

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
</script>
