<template>
  <TransitionGroup
    class="messages--container"
    name="messages-queue"
    tag="div"
  >
    <FeedbackMessage
      v-for="message in globalStore.messages"
      :key="message.content + message.type + message.title"
      :message="message"
    />
  </TransitionGroup>
</template>

<script setup lang="ts">
import { useGlobalStore } from '../store/global.store';
import FeedbackMessage from './feedback-message.vue';

const globalStore = useGlobalStore();
</script>

<style scoped lang="scss">
.messages--container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 2rem;
  min-width: 220px;
  max-width: 450px;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
}

.messages-queue-enter-active,
.messages-queue-leave-active {
  transition: all 0.5s ease;
}

.messages-queue-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.messages-queue-enter-to {
  opacity: 1;
  transform: translateY(0);
}

.messages-queue-leave-from {
  opacity: 1;
  transform: translateY(0);
}

.messages-queue-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
