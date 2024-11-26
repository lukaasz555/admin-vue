<template>
  <v-dialog v-model="isPopupVisible" class="dialog">
    <section class="dialog__section">
      <header class="dialog__header">
        <h2 class="dialog__header--title">{{ title }}</h2>
        <v-icon
          class="dialog__header--close-icon"
          :size="26"
          @click="emit('close')"
          >mdi-close</v-icon
        >
      </header>
      <div class="dialog__content">
        <slot />
      </div>
    </section>
  </v-dialog>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TranslateResult } from 'vue-i18n';

type PopupEmits = {
  (e: 'close'): void;
};
const emit = defineEmits<PopupEmits>();

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  title: {
    type: String as PropType<TranslateResult>,
    required: true,
  },
});

const isPopupVisible = computed({
  get: () => props.modelValue,
  set: () => emit('close'),
});
</script>

<style lang="scss" scoped>
.dialog {
  max-width: $popup-max-width;
  &__section {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    border-radius: $border-radius-l;
    padding: 1rem;
    background-color: $color-background;
    overflow: hidden;
  }
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  &__content {
    width: 100%;
  }
}
</style>
