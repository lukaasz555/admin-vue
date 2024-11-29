<template>
  <div class="message-container">
    <div class="message-container__title">
      <v-icon :size="28">mdi-check-circle</v-icon>
      <p>{{ $t('Email has been sent!') }}</p>
    </div>
    <div class="message-container__content">
      <p>
        {{ $t('We have sent a password recovery email to') }}
        <strong>{{ email }}</strong>
      </p>
      <p class="message-container__hint">
        {{
          $t(
            'Please check your inbox and follow the instructions to reset your password.',
          )
        }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  email: {
    type: String,
    required: true,
  },
});
</script>

<style scoped lang="scss">
.message-container {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 0.75rem;

  &__title {
    font-weight: 600;
    font-size: 1.5rem;
    color: $color-success;
    display: flex;
    align-items: center;
    gap: 4px;
    justify-content: center;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-top: 16px;

    p {
      text-align: center;
    }
  }

  &__hint {
    margin-top: 8px;
    font-size: 0.8rem;
  }
}
</style>
