<template>
  <v-dialog v-model="isPopupVisible">
    <section>
      <header>
        <h2>{{ title }}</h2>
        <v-icon @click="emit('close')">mdi-close</v-icon>
      </header>
      <div class="content">
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
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 20px;
  border-radius: $border-radius-l;
  padding: 1rem;
  background-color: $color-background;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .content {
    width: 100%;
  }
}
</style>
