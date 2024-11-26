<template>
  <v-tabs v-model="currentTab" :align-tabs="tabsAlign">
    <v-tab
      v-for="item in items"
      :key="String(item.value)"
      :value="item.value"
    >
      {{ item.label }}
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts" generic="T">
import { TabsMenuItem } from '../types/tabs-menu-item';

type TabsMenuEmits = {
  (e: 'change', tab: TabsMenuItem<T>): void;
};

type TabsMenuProps = {
  items: TabsMenuItem<T>[];
  selectedTab: TabsMenuItem<T>;
  tabsAlign: 'title' | 'end' | 'start' | 'center';
};

const emit = defineEmits<TabsMenuEmits>();
const props = defineProps<TabsMenuProps>();

const currentTab = computed({
  get: () => props.selectedTab,
  set: (val) => emit('change', val),
});
</script>
