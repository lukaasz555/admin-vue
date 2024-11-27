<template>
  <div class="auth">
    <div class="auth__container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  &__container {
    min-width: 250px;
    max-width: 400px;
    width: 100%;
    padding: 1.5rem 1.5rem;
    border: 1px solid $color-border;
    border-radius: $border-radius-xl;
  }
}
</style>
