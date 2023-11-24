<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import VideoComponent from './VideoComponent.vue';
import { useDeviceManager, useGetSelectedDeviceId, useMapDeviceList } from '../composables/deviceManager'
import { type MediaOptionsType } from '@/types/types'

const stream: Ref<any> = ref(null)
const cameraDevices: Ref<MediaOptionsType[]> = ref([])
const microphoneDevices: Ref<MediaOptionsType[]> = ref([])
const selectedCamera: Ref<string> = ref('')
const selectedMicrophone: Ref<string> = ref('')
const enabledAudio: Ref<boolean> = ref(true)
const enabledVideo: Ref<boolean> = ref(true)
const deviceManager = useDeviceManager()
function handleDeviceManager(event: any) {
	const { microphones, stream } = event
	if (microphones) {
		microphoneDevices.value = microphones?.map(useMapDeviceList)
	}
	if (stream) {
        stream.value = stream
		selectedMicrophone.value = useGetSelectedDeviceId(stream, 'Audio')
    }
}
onMounted(() => {
	deviceManager.onChange(handleDeviceManager)
	deviceManager.start();
})
</script>

<template>
	<div class="shadow rounded-md p-5">
		<VideoComponent :stream="stream" muted />
		<div class="w-full flex flex-col">
			<label for="microphones">Micrófonos</label>
			<div class="select-wrapper">
				<select v-model="selectedMicrophone" id="microphones" class="select-field">
					<option v-for="(op, index) in microphoneDevices" :key="index" :value="op.value" v-text="op.label"></option>
				</select>
				<div class="select-arrow">
					<svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" version="1.1"><path d="M 108.534 151.254 C 103.242 152.651, 94.858 161.059, 93.216 166.616 C 91.346 172.947, 91.747 178.931, 94.415 184.500 C 95.964 187.732, 120.924 217.612, 165.002 269 C 202.507 312.725, 235.165 350.581, 237.574 353.125 C 246.906 362.978, 259.127 364.685, 269.609 357.601 C 274.699 354.162, 414.844 190.220, 417.585 184.500 C 422.156 174.960, 420.352 165.301, 412.530 157.431 C 408.823 153.701, 406.252 152.049, 402.803 151.181 C 396.546 149.605, 114.514 149.675, 108.534 151.254" stroke="none" fill-rule="evenodd"/></svg>
				</div>
			</div>
		</div>
	</div>
</template>