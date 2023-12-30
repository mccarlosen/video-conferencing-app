<script setup lang="ts">
import TopBar from './components/TopBar.vue';
</script>

<template>
	<TopBar></TopBar>
	<div class="w-full overflow-y-auto overflow-x-hidden pt-[70px]">
		<div class="max-w-6xl mx-auto h-[calc(100vh_-70px)]">
			<router-view></router-view>
		</div>
	</div>
</template>