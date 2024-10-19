<template>
  <div
    :class="[
      'd-flex',
      align === 'left' ? 'justify-start' : '',
      align === 'center' ? 'justify-center' : '',
      align === 'right' ? 'justify-end' : '',
    ]"
  >
    <v-btn
      :block="isFullWidth"
      :disabled="isDisabled"
      :height="height"
      :loading="isLoading"
      :ripple="false"
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

const props = defineProps({
  label: { type: String, default: 'Save' },
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'center',
  },
  variant: {
    type: String as PropType<'outlined' | 'flat' | 'text' | 'plain'>,
    default: 'flat',
  },
  height: { type: Number, default: undefined },
  isFullWidth: { type: Boolean, default: false },
  isDisabled: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false },
});
</script>
