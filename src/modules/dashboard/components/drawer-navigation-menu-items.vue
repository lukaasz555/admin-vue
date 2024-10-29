<template>
  <v-list>
    <DrawerNavigationItem
      v-for="item in navigationItems"
      :key="item.routeName"
      :item="item"
    />
  </v-list>
</template>

<script setup lang="ts">
import { navigationItems } from '../utils/navigation-items';
import DrawerNavigationItem from './drawer-navigation-item.vue';
</script>
