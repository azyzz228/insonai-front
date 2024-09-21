<script setup lang="ts">
const props = defineProps<{
  isCallStarted: boolean
}>()
</script>

<template>
  <div
    :class="{ active: isCallStarted }"
    class="chat-wrapper w-full border border-gray-200 rounded-[12px] bg-indigo-600 relative"
  >
    <transition name="blur">
      <div
        v-if="!isCallStarted"
        class="absolute top-1/2 translate-x-[-50%] left-1/2 translate-y-[-50%] text-[28px] w-full text-center font-bold text-white"
      >
        Start your first interaction with our AI!
      </div>
      <div v-else class="chat flex flex-col gap-[12px] mt-auto">
        <div class="message">
          <span class="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
            <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </span>
          <div class="message-item">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, laudantium.
          </div>
        </div>
        <div class="message message-user">
          <span class="inline-block h-10 w-10 overflow-hidden rounded-full bg-gray-100">
            <svg class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
              <path
                d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </span>
          <div class="message-item">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, laudantium.
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.chat-wrapper {
  height: calc(100vh - 170px);
  min-height: 400px;
  transition: all 0.3s ease;
  overflow: hidden;
  &.active {
    background-color: rgb(249 250 251 / 1);
  }
}
.chat {
  overflow: scroll;
  height: 100%;
  padding: 20px;
  scrollbar-width: none; /* Для Firefox */
  &::-webkit-scrollbar {
    display: none; /* Для WebKit-браузеров (Chrome, Safari) */
  }
}
.message {
  display: flex;
  align-items: flex-end;
  gap: 12px;
  &-user {
    justify-content: flex-end;
    .message-item {
      border-radius: 20px 20px 0 20px;
      order: -1;
      background: white;
      color: black;
      border: 1px solid gray;
    }
  }
}
.avatar {
  width: 30px;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: gray;
}
.message-item {
  padding: 0.6rem 1.2rem;
  background: rgb(79, 70, 229);
  color: white;
  font-weight: 600;
  border-radius: 20px 20px 20px 0;
  width: fit-content;
  max-width: 50%;
}
</style>
