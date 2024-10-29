<template>
  <v-list-item link :title="item.title" @click="handleNavigation" />
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { NavigationItem } from '../types/navigation-item';
import router from '@/plugins/router';

const props = defineProps({
  item: {
    type: Object as PropType<NavigationItem>,
    required: true,
  },
});

function handleNavigation(): void {
  router.push({ name: props.item.routeName });
}
</script>
