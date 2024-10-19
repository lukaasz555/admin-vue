<template>
  <div class="input--container">
    <v-text-field
      v-model="inputValue"
      :label="label"
      variant="outlined"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void;
}>();

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: { type: String, required: true },
  isDisabled: { type: Boolean, default: false },
});

const inputValue = computed({
  get: () => props.modelValue,
  set: (val: string) => emit('update:modelValue', val),
});
</script>
