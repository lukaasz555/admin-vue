<template>
  <div v-if="isVisible" class="view-container--loading">
    <v-progress-circular
      class="mr-1"
      color="primary"
      indeterminate
      :size="25"
    ></v-progress-circular>
    <span v-if="message">
      {{ $t('Validating token') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TranslateResult } from 'vue-i18n';

defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String as PropType<TranslateResult>,
    default: '',
  },
});
</script>
