<template>
  <div v-if="isVisible" class="view-container--loading">
    <v-progress-circular
      class="mr-1"
      color="primary"
      indeterminate
      :size="25"
    ></v-progress-circular>
    <span v-if="message">
      {{ message }}
    </span>
  </div>
</template>

<script setup lang="ts">
import i18n from '@/plugins/i18n';
import { PropType } from 'vue';
import { TranslateResult } from 'vue-i18n';

defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String as PropType<TranslateResult>,
    default: i18n.global.t('Validating token'),
  },
});
</script>
