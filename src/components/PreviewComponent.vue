<script setup lang="ts">
import { onMounted, ref, watch, type Ref, onUpdated } from 'vue';
import VideoComponent from './VideoComponent.vue';
import { useDeviceManager, useGetSelectedDeviceId, useMapDeviceList } from '@/composables/deviceManager'
import { useMeetingStore } from '@/stores/meeting';
import { type MediaOptionsType } from '@/types/types'

const emit = defineEmits(['onJoin', 'onEndMeeting'])
const meetingStore = useMeetingStore()
const loading: Ref<boolean> = ref(true)
const mediaStream: Ref<any> = ref(null)
const cameraDevices: Ref<MediaOptionsType[]> = ref([])
const microphoneDevices: Ref<MediaOptionsType[]> = ref([])
const selectedCamera: Ref<string> = ref('')
const selectedMicrophone: Ref<string> = ref('')
const enabledAudio: Ref<boolean> = ref(true)
const enabledVideo: Ref<boolean> = ref(true)
const deviceManager = useDeviceManager()
function handleDeviceManager(event: any) {
	const { cameras, microphones, stream, error } = event
	if (cameras && microphones) {
		microphoneDevices.value = microphones?.map(useMapDeviceList)
		cameraDevices.value = cameras?.map(useMapDeviceList)
	}
	if (stream) {
    mediaStream.value = stream
		selectedCamera.value = useGetSelectedDeviceId(stream, 'Video')
		selectedMicrophone.value = useGetSelectedDeviceId(stream, 'Audio')
	}
	if (error) {
		console.log(error);
	}
}
onMounted(() => {
	deviceManager.onChange(handleDeviceManager)
	deviceManager.start().then(() => {
		loading.value = false
	});
})
onUpdated(() => {
	if (!enabledVideo.value) {
		mediaStream.value = null
	}
})
watch(enabledVideo, (newValue) => {
	deviceManager.updateWithOptions({
		audio: enabledAudio.value,
		video: newValue
	})
})
watch(enabledAudio, (newValue) => {	
	deviceManager.updateWithOptions({
		audio: newValue,
		video: enabledVideo.value
	})
})
function handleCamera($event: any) {
	const { value } = $event.target
	selectedCamera.value = value
	deviceManager.setVideoInput(value);
	deviceManager.storeConstraints();
}
function handleMicrophone($event: any) {
	const { value } = $event.target
	selectedMicrophone.value = value
	deviceManager.setAudioInput(value);
	deviceManager.storeConstraints();
}
function onJoinToMeeting() {
	meetingStore.mediaOptions = { audio: enabledAudio, video: enabledVideo }
	deviceManager.storeConstraints();
	emit('onJoin')
}
function onEndMeeting() {
	emit('onEndMeeting')
}
</script>

<template>
	<div class="max-w-sm shadow rounded-md p-5 space-y-5 border">
		<div v-if="loading">
			<p>loading....</p>
		</div>
		<template v-else>
			<VideoComponent class="w-full h-[256px] rounded bg-black" :stream="mediaStream" muted />
			<!-- cameras -->
			<div class="w-full flex flex-col space-y-3">
				<label class="relative font-bold text-sm flex justify-between" for="cameras">
					<span>Cámara</span>
					<input v-model="enabledVideo" class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-black after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-c1-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]" type="checkbox" role="switch" />
				</label>
				<div class="select-wrapper">
					<select @input="handleCamera" id="cameras" class="select-field" :disabled="!enabledVideo">
						<option v-for="(op, index) in cameraDevices" :key="index" :value="op.value" v-text="op.label"></option>
					</select>
					<div class="select-arrow">
						<svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" version="1.1"><path d="M 108.534 151.254 C 103.242 152.651, 94.858 161.059, 93.216 166.616 C 91.346 172.947, 91.747 178.931, 94.415 184.500 C 95.964 187.732, 120.924 217.612, 165.002 269 C 202.507 312.725, 235.165 350.581, 237.574 353.125 C 246.906 362.978, 259.127 364.685, 269.609 357.601 C 274.699 354.162, 414.844 190.220, 417.585 184.500 C 422.156 174.960, 420.352 165.301, 412.530 157.431 C 408.823 153.701, 406.252 152.049, 402.803 151.181 C 396.546 149.605, 114.514 149.675, 108.534 151.254" stroke="none" fill-rule="evenodd"/></svg>
					</div>
				</div>
			</div>
			<!-- microphones -->
			<div class="w-full flex flex-col space-y-3">
				<label class="relative font-bold text-sm flex justify-between" for="microphones">
					<span>Micrófono</span>
					<input v-model="enabledAudio" class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-black after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-c1-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]" type="checkbox" role="switch" />
				</label>
				<div class="select-wrapper">
					<select @input="handleMicrophone" id="microphones" class="select-field" :disabled="!enabledAudio">
						<option v-for="(op, index) in microphoneDevices" :key="index" :value="op.value" v-text="op.label"></option>
					</select>
					<div class="select-arrow">
						<svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" version="1.1"><path d="M 108.534 151.254 C 103.242 152.651, 94.858 161.059, 93.216 166.616 C 91.346 172.947, 91.747 178.931, 94.415 184.500 C 95.964 187.732, 120.924 217.612, 165.002 269 C 202.507 312.725, 235.165 350.581, 237.574 353.125 C 246.906 362.978, 259.127 364.685, 269.609 357.601 C 274.699 354.162, 414.844 190.220, 417.585 184.500 C 422.156 174.960, 420.352 165.301, 412.530 157.431 C 408.823 153.701, 406.252 152.049, 402.803 151.181 C 396.546 149.605, 114.514 149.675, 108.534 151.254" stroke="none" fill-rule="evenodd"/></svg>
					</div>
				</div>
			</div>
			<!-- button -->
			<div class="flex justify-end space-x-2">
				<button @click="onEndMeeting" class="rounded bg-white text-black transition duration-150 ease-in-out hover:bg-gray-200 px-4 py-2">Cancel</button>
				<button @click="onJoinToMeeting" class="rounded bg-c1-500 text-black transition duration-150 ease-in-out hover:bg-c1-400 px-4 py-2">Join to Meeting</button>
			</div>
		</template>
	</div>
</template>