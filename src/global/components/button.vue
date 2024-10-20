<template>
  <div :class="['d-flex', alignOptions[align]]">
    <v-btn
      :aria-disabled="isDisabled"
      :block="isFullWidth"
      :disabled="isDisabled"
      :height="height"
      :loading="isLoading"
      :ripple="false"
      :size="size"
      :type="type"
      :variant="variant"
      @click="emit('click')"
    >
      {{ label }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const emit = defineEmits<{
  (e: 'click'): void;
}>();

defineProps({
  label: { type: String, default: 'Save' },
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },
  variant: {
    type: String as PropType<'outlined' | 'flat' | 'text' | 'plain'>,
    default: 'flat',
  },
  type: {
    type: String as PropType<'reset' | 'submit' | 'button'>,
    default: 'button',
  },
  size: {
    type: String as PropType<
      'x-small' | 'small' | 'default' | 'large' | 'x-large'
    >,
    default: 'default',
  },
  height: { type: Number, default: undefined },
  isFullWidth: { type: Boolean, default: false },
  isDisabled: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false },
});

const alignOptions = {
  left: 'justify-start',
  center: 'justify-center',
  right: 'justify-end',
};
</script>
