<template>
  <div class="action-buttons">
    <v-btn
      icon="mdi-pencil"
      size="x-small"
      @click="emit('edit', itemId)"
    />
    <v-btn
      icon="mdi-delete"
      size="x-small"
      @click="emit('delete', itemId)"
    />
  </div>
</template>

<script setup lang="ts" generic="T">
const emit = defineEmits<{
  (e: 'edit', itemId: T): void;
  (e: 'delete', itemId: T): void;
}>();

defineProps<{
  itemId: T;
}>();
</script>

<style scoped lang="scss">
.action-buttons {
  display: flex;
  align-items: center;
}
</style>
