<template>
	<div class="call-page flex flex-col gap-[40px]">
		<v-button large class="w-fit mx-auto">
			Make your first call
		</v-button>
		<div class="flex items-start gap-[40px]">
			<v-phone/>
			<main-chat/>
		</div>
	</div>
</template>

<script setup lang="ts">

import VButton from "@/components/ui/VButton.vue";
import VPhone from "@/components/dashboard-section/VPhone.vue";
import MainChat from "@/components/dashboard-section/MainChat.vue";
</script>

<style scoped lang="scss">

</style>
