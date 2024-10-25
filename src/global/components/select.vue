<template>
  <v-select
    v-model="selectValue"
    item-title="displayText"
    item-value="value"
    :items="items"
    :label="label"
    return-object
    variant="outlined"
  ></v-select>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { SelectItemType } from '../types/select-item.type';

const emit = defineEmits<{
  (e: 'update:modelValue', item: SelectItemType): void;
}>();

const props = defineProps({
  modelValue: {
    type: Object as PropType<SelectItemType>,
    required: true,
  },
  items: {
    type: Array as PropType<SelectItemType[]>,
    required: true,
  },
  label: { type: String, required: true },
  variant: { type: String, default: 'outlined' },
});

const selectValue = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val);
  },
});
</script>
