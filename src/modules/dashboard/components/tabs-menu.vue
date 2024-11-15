<template>
  <v-tabs v-model="currentTab" :align-tabs="tabsAlign">
    <v-tab
      v-for="item in items"
      :key="item.value"
      :value="item.value"
    >
      {{ item.label }}
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TabsMenuItem } from '../types/tabs-menu-item';

type TabsMenuEmits = {
  (e: 'change', tab: TabsMenuItem): void;
};

const emit = defineEmits<TabsMenuEmits>();

const props = defineProps({
  items: {
    type: Array as PropType<TabsMenuItem[]>,
    required: true,
  },
  selectedTab: {
    type: Object as PropType<TabsMenuItem>,
    required: true,
  },
  tabsAlign: {
    type: String as PropType<'title' | 'end' | 'start' | 'center'>,
    default: 'start',
  },
});

const currentTab = computed({
  get: () => props.selectedTab,
  set: (val) => emit('change', val),
});
</script>
