<script setup lang="ts"></script>

<template>
  <div class="layout">
    <router-view />
    <slot />
  </div>
</template>

<style scoped lang="scss">
.blur-enter-active,
.blur-leave-active {
  transition: all 0.5s;
}
.blur-enter-from,
.blur-leave-to {
  opacity: 0;
  transition: all 0s;
  filter: blur(1.5rem);
}
</style>
