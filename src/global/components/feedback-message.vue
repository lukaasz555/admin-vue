<template>
  <div class="message--container" :class="getMessageClass()">
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
  globalStore.removeMessage(props.message.timestamp);
}

function getMessageClass(): string {
  switch (props.message.type) {
    case MessageType.ERROR:
      return 'message-error';
    case MessageType.SUCCESS:
      return 'message-success';
    case MessageType.INFO:
      return 'message-info';
    case MessageType.WARNING:
      return 'message-warning';
    default:
      return '';
  }
}
</script>

<style scoped lang="scss">
.message--container {
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  width: 100%;
  // TODO: replace with variables.scss after merge
  /* border-radius: $border-radius-m; */
  border-radius: 1rem;
  border: 2px solid transparent;

  &.message-success {
    background-color: #6b9080;
  }
  &.message-error {
    background-color: #e56b6f;
  }
  &.message-info {
    background-color: #4062bb;
  }
  &.message-warning {
    background-color: #d3b99f;
  }
}
</style>
