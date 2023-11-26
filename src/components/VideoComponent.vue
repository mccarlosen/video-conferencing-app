<script setup lang="ts">
import { onMounted, onUpdated, ref, type Ref } from 'vue';

const props = defineProps<{
	muted?: boolean
	stream?: any
}>()
const video: any = ref(null)
const playPromise = ref(Promise.resolve())
const errorVideo = () => console.log('Enable to play video')
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
onMounted(() => {
	const { stream } = props
	if (stream && video.value && !video.value.srcObject) {
		playPromise.value = playPromise.value.then(() => {
			video.value.srcObject = stream;
			return Promise.race([video.value.play().catch(errorVideo), sleep(150)]);
		});
	}
})
onUpdated(() => {
	const { stream } = props
	if (stream && video.value && (!video.value.srcObject || stream)) {
		playPromise.value = playPromise.value.then(() => {
			video.value.srcObject = stream;
			return Promise.race([video.value.play().catch(errorVideo), sleep(150)]);
		});
	}
})
</script>

<template>
	<video class="w-full h-[256px] rounded" ref="video" :muted="props.muted" playsInline />
</template>