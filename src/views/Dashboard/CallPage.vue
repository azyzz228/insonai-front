<template>
  <div class="call-page flex flex-col gap-[40px]">
    <v-button @click="makeCall" large class="w-fit mx-auto">
      {{ isCalling ? 'Finish your call' : 'Start your call' }}
    </v-button>
    <div class="flex items-start gap-[40px]">
      <v-phone />
      <main-chat :is-call-started="isCalling" />
    </div>
  </div>
</template>

<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
import VPhone from '@/components/dashboard-section/VPhone.vue'
import MainChat from '@/components/dashboard-section/MainChat.vue'
import { ref } from 'vue'

const isCalling = ref(false)

const makeCall = () => {
  isCalling.value = !isCalling.value
}
</script>

<style scoped lang="scss"></style>
