<template>
  <div class="call-page flex flex-col gap-[30px]">
    <div class="flex items-center justify-between h-[56px]">
      <v-button :disabeld="isButtons === true" @click="isButtons = !isButtons" large class="w-fit">
        Start your call
      </v-button>
      <div v-if="isButtons" class="flex items-center gap-[12px] justify-center pr-[20px]">
        <button
          @click="makeCall"
          type="button"
          :disabled="isCalling"
          v-if="!isCalling"
          class="answer-button rounded-full bg-green-500 p-4 text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PhoneIcon class="h-6 w-6" aria-hidden="true" />
        </button>
        <button
          v-else
          type="button"
          @click="endCall"
          class="rounded-full relative z-10 bg-red-500 p-4 text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          <PhoneXMarkIcon class="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
    <main-chat :is-call-started="isCalling" />
  </div>
</template>

<script setup lang="ts">
import VButton from '@/components/ui/VButton.vue'
import MainChat from '@/components/dashboard-section/MainChat.vue'
import { PhoneIcon, PhoneXMarkIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'

const isCalling = ref(false)
const isButtons = ref(false)
const endCall = () => {
  isButtons.value = false
  isCalling.value = false
}
const makeCall = () => {
  isCalling.value = !isCalling.value
}
</script>

<style scoped lang="scss">
.answer-button {
  position: relative;
  z-index: 2;
  &::before {
    content: '';
    z-index: 1;
    position: absolute;
    border: 1px solid rgb(34 197 94 / 1);
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: pulse 1s linear infinite;
  }
  &::after {
    content: '';
    z-index: 1;
    position: absolute;
    border: 1px solid rgb(34 197 94 / 1);
    inset: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    animation: pulse 1s linear infinite;
    animation-delay: 0.3s;
  }
}
@keyframes pulse {
  0% {
    transform: scale(0.5);
    opacity: 0;
  }

  50% {
    transform: scale(1.3);
    opacity: 1;
  }

  100% {
    transform: scale(1.6);
    opacity: 0;
  }
}
</style>
