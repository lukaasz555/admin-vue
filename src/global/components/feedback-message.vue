<template>
  <div class="message" :class="messageClass">
    <div class="d-flex items-center justify-space-between">
      <h3>{{ message.title }}</h3>
      <v-icon @click="closeMessage">mdi-close</v-icon>
    </div>
    <p>{{ message.content }}</p>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Message } from '../models/message';
import { MessageType } from '../enums/message-type.enum';
import { useGlobalStore } from '../store/global.store';

const props = defineProps({
  message: {
    type: Object as PropType<Message>,
    required: true,
  },
});

const globalStore = useGlobalStore();

function closeMessage(): void {
  globalStore.removeMessage(props.message.id);
}

const messageClass = computed(() => ({
  'message--error': props.message.type === MessageType.ERROR,
  'message--success': props.message.type === MessageType.SUCCESS,
  'message--info': props.message.type === MessageType.INFO,
  'message--warning': props.message.type === MessageType.WARNING,
}));
</script>

<style scoped lang="scss">
.message {
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  width: 100%;
  border-radius: $border-radius-m;
  border: 2px solid transparent;

  &--success {
    background-color: $color-success;
  }
  &--error {
    background-color: $color-error;
  }
  &--info {
    background-color: $color-info;
  }
  &--warning {
    background-color: $color-warning;
  }
}
</style>
