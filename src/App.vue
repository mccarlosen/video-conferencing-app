<script setup lang="ts">
import TopBar from './components/TopBar.vue';
</script>

<template>
	<TopBar></TopBar>
	<div class="max-w-7xl mx-auto py-5">
		<router-view></router-view>
	</div>
</template>