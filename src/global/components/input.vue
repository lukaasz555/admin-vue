<template>
  <div
    :style="{
      minWidth: minWidth,
    }"
  >
    <v-text-field
      v-model="inputValue"
      :error-messages="errorMessage"
      :hide-details="hideDetails"
      :label="label"
      :rules="rules"
      :type="type"
      variant="outlined"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
}>();

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  type: {
    type: String as PropType<'text' | 'password'>,
    default: 'text',
  },
  label: {
    type: String,
    required: true,
  },
  isDisabled: {
    type: Boolean,
    default: false,
  },
  rules: {
    type: Array as PropType<((v: string) => true | string)[]>,
    default: () => [],
  },
  errorMessage: {
    type: String,
    default: '',
  },
  minWidth: {
    type: String,
    default: 'unset',
  },
  hideDetails: {
    type: Boolean,
    default: false,
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
});
</script>
