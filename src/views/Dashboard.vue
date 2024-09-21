<template>
  <div class="">
    <v-sidebar />
    <main class="py-4 lg:py-10 lg:pl-72">
      <div class="px-4">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import VSidebar from '@/components/layout/layout-blocks/VSidebar.vue'
</script>
