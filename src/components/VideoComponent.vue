<script setup lang="ts">
const props = defineProps<{
	muted?: boolean
	stream?: any
}>()
</script>

<template>
	<video ref="videoTarget" :muted="props.muted" playsInline />
</template>