<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
	muted?: boolean
	stream?: any
}>()
const videoTarget: any = ref(null)
const playPromise = ref(Promise.resolve())
const errorVideo = () => console.log('Enable to play video')
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
onMounted(() => {
	const { stream } = props
	if (stream && videoTarget.value && !videoTarget.value.srcObject) {
		console.log(stream, videoTarget.value);
		playPromise.value = playPromise.value.then(() => {
			videoTarget.value.srcObject = stream;
			return Promise.race([videoTarget.value.play().catch(errorVideo), sleep(150)]);
		});
	}
})
onBeforeUnmount(() => {
	if (videoTarget.value) {
		videoTarget.value.srcObject = null
	}
})
</script>

<template>
	<video class="w-full rounded" ref="videoTarget" :muted="props.muted" playsInline />
</template>