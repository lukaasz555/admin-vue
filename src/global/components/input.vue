<template>
  <div class="input--container">
    <v-text-field
      v-model="inputValue"
      :error-messages="errors"
      :label="label"
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
  errors: {
    type: Array as PropType<string[] | undefined>,
    default: () => [],
  },
});

const inputValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
});
</script>
