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
          <div class="avatar"></div>
          <div class="message-item">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur, laudantium.
          </div>
        </div>
        <div class="message message-user">
          <div class="avatar"></div>
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
