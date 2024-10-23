<template>
  <v-app-bar :elevation="2">
    <template #prepend>
      <v-app-bar-nav-icon @click="testFc" />
    </template>

    <v-app-bar-title>Header...</v-app-bar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click'): void;
}>();

function testFc(): void {
  console.log('test toggle...');
  emit('click');
}
</script>
