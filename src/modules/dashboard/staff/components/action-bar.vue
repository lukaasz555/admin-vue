<template>
  <div class="action-bar">
    <Input
      v-model="searchQuery"
      hide-details
      :label="$t('Search staff member')"
      :min-width="'300px'"
    />
    <Button
      :label="$t('Add member')"
      size="large"
      @click="emit('add-staff')"
    />
  </div>
</template>

<script setup lang="ts">
import Button from '@/global/components/button.vue';
import Input from '@/global/components/input.vue';

type ActionBarEmits = {
  (e: 'add-staff'): void;
  (e: 'update', val: string): void;
};

const emit = defineEmits<ActionBarEmits>();

const props = defineProps({
  searchQuery: {
    type: String,
    required: true,
  },
});

const searchQuery = computed({
  get: () => props.searchQuery,
  set: (val: string) => emit('update', val),
});
</script>

<style scoped lang="scss">
.action-bar {
  margin: 20px 0;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
