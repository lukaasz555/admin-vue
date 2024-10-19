<template>
  <div class="auth--wrapper">
    <div class="auth--wrapper__form--container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth--wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  &__form--container {
    min-width: 250px;
    max-width: 400px;
    width: 100%;
    padding: 1.5rem 1.5rem 0.75rem;
    border: 1px solid $border-color;
    border-radius: $border-radius-xl;
  }
}
</style>
