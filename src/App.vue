<script setup lang="ts">
import TopBar from './components/TopBar.vue';
</script>

<template>
	<TopBar></TopBar>
	<div class="max-w-7xl mx-auto h-[calc(100vh_-70px)]">
		<router-view></router-view>
	</div>
</template>