<template>
  <div v-if="isLoading" class="loader">
    <v-progress-circular
      color="primary"
      indeterminate
      :size="50"
    ></v-progress-circular>
  </div>
</template>

<script setup lang="ts">
defineProps({
  isLoading: {
    type: Boolean,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.loader {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  min-height: 100dvh;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
