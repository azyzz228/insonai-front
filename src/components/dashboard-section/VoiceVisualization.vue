<template>
  <div class="bars">
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
    <div class="bar"></div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'

const props = defineProps<{
  indicator: number
}>()
watch(
  () => props.indicator,
  (newVal) => {
    indicatorNumber.value = newVal
  }
)
const indicatorNumber = ref(props.indicator)
const indicatorValue = computed(() => `${indicatorNumber.value}px`)
</script>
<style scoped lang="scss">
.bars {
  display: flex;
  justify-content: center;
  align-items: center;
}

.bar {
  background: #52467b;
  bottom: 1px;
  height: calc(10px + v-bind(indicatorValue));
  width: 6px;
  margin: 0 4px;
  border-radius: 5px;
  animation: sound 0ms -600ms linear infinite alternate;
}

@keyframes sound {
  0% {
    opacity: 0.35;
    height: 3px;
  }
  100% {
    opacity: 1;
  }
}

.bar:nth-child(1) {
  left: 1px;
  animation-duration: 474ms;
}
.bar:nth-child(2) {
  left: 15px;
  animation-duration: 433ms;
}
.bar:nth-child(3) {
  left: 29px;
  animation-duration: 407ms;
}
.bar:nth-child(4) {
  left: 43px;
  animation-duration: 458ms;
}
.bar:nth-child(5) {
  left: 57px;
  animation-duration: 400ms;
}
.bar:nth-child(6) {
  left: 71px;
  animation-duration: 427ms;
}
.bar:nth-child(7) {
  left: 85px;
  animation-duration: 441ms;
}
.bar:nth-child(8) {
  left: 99px;
  animation-duration: 419ms;
}
.bar:nth-child(9) {
  left: 113px;
  animation-duration: 487ms;
}
.bar:nth-child(10) {
  left: 127px;
  animation-duration: 442ms;
}
</style>
