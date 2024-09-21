<script setup lang="ts">
import {computed} from "vue";

const props = defineProps<{
	large?: boolean
}>();
const className = computed(() => {
	return {
		"button--large": props.large,
	};
});
</script>

<template>
	<button :class="className" type="button" class="button rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
		<slot/>
	</button>
</template>

<style scoped lang="scss">
.button{
	&--large {
		padding: 0.625rem 0.875rem;
		font-weight: 700;
	}
}
</style>
