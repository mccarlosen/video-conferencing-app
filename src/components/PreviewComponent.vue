<script setup lang="ts">
import { onMounted, ref, watch, type Ref, onUpdated } from 'vue';
import VideoComponent from './VideoComponent.vue';
import { useDeviceManager, useGetSelectedDeviceId, useMapDeviceList } from '../composables/deviceManager'
import { type MediaOptionsType } from '@/types/types'

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
function handleCameraChange($event: any) {
	const { value } = $event.target
	selectedCamera.value = value
	deviceManager.setVideoInput(value);
	deviceManager.storeConstraints();
}
function handleMicrophoneChange($event: any) {
	const { value } = $event.target
	selectedMicrophone.value = value
	deviceManager.setAudioInput(value);
	deviceManager.storeConstraints();
}
</script>

<template>
	<div class="max-w-sm shadow rounded-md p-5 space-y-5 border">
		<div v-if="loading">
			<p>loading....</p>
		</div>
		<template v-else>
			<template v-if="mediaStream && enabledVideo">
				<VideoComponent :stream="mediaStream" muted />
			</template>
			<template v-if="!enabledVideo">
				<div class="flex items-center justify-center w-full rounded bg-black p-10 h-[256px]">
					<svg class="w-14 fill-gray-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" version="1.1"><path d="M 430.500 48.551 C 428.850 49.398, 413.322 64.245, 395.994 81.545 L 364.488 113 353.478 113 L 342.468 113 334.652 89.479 C 326.423 64.719, 324.426 60.912, 318.329 58.364 C 313.512 56.352, 180.488 56.352, 175.671 58.364 C 169.576 60.911, 167.576 64.722, 159.369 89.416 L 151.573 112.876 105.537 113.234 C 55.593 113.622, 57.088 113.467, 44.512 119.586 C 36.831 123.324, 26.417 133.611, 22.245 141.581 C 15.688 154.111, 16 147.213, 16 279.500 C 16 412.357, 15.671 405.356, 22.479 417.530 C 25.861 423.577, 32.063 430.784, 37.284 434.735 L 40.067 436.841 38.037 440.170 C 35.608 444.156, 35.329 451.802, 37.464 455.931 C 40.873 462.523, 48.092 465.925, 55.750 464.548 C 59.106 463.945, 80.141 443.242, 255.770 267.687 C 466.080 57.465, 455.187 68.873, 453.453 60.666 C 451.240 50.191, 439.442 43.964, 430.500 48.551 M 426.007 142.438 L 398.514 170 412.289 170 C 427.562 170, 430.647 170.783, 435.436 175.876 C 437.836 178.428, 438.440 180.049, 438.741 184.749 C 439.172 191.466, 437.064 195.771, 431.759 199.005 C 428.756 200.836, 426.690 200.993, 405.500 200.993 C 384.253 200.993, 382.250 200.840, 379.216 198.991 C 377.410 197.889, 375.658 196.273, 375.323 195.399 C 374.868 194.214, 370.308 198.208, 357.459 211.041 L 340.205 228.274 344.077 236.034 C 346.206 240.302, 349.176 247.778, 350.676 252.647 C 353.216 260.894, 353.403 262.732, 353.403 279.500 C 353.403 296.306, 353.220 298.093, 350.651 306.438 C 335.607 355.309, 288.535 385.023, 239.659 376.500 C 230.216 374.853, 217.373 370.497, 210.293 366.540 C 207.793 365.143, 205.397 364, 204.968 364 C 203.917 364, 123 444.183, 123 445.225 C 123 445.676, 196.912 445.921, 287.250 445.769 C 443.706 445.505, 451.761 445.404, 457 443.651 C 476.066 437.268, 489.841 423.228, 494.469 405.458 C 495.803 400.337, 496 384.037, 496 278.895 C 496 161.779, 495.942 158.023, 494.036 151.855 C 489.736 137.937, 479.113 125.284, 466.527 119.088 C 454.049 112.945, 457.287 111.080, 426.007 142.438 M 239 182.080 C 229.625 183.743, 214.350 189.516, 205.822 194.620 C 189.498 204.390, 173.249 222.806, 166.074 239.667 C 159.788 254.438, 158.540 260.935, 158.519 279 C 158.503 293.185, 158.825 296.690, 160.818 303.984 C 162.092 308.651, 163.345 312.678, 163.602 312.935 C 163.858 313.192, 169.678 307.806, 176.534 300.966 L 189 288.530 189 279.425 C 189 241.577, 220.259 210.771, 257.268 212.146 L 265.036 212.434 277.500 200 C 284.356 193.161, 289.635 187.242, 289.232 186.847 C 288.830 186.453, 285.125 185.161, 281 183.978 C 272.356 181.498, 248.389 180.415, 239 182.080 M 272.166 296.334 L 227.841 340.668 232.254 342.353 C 258.065 352.210, 286.817 345.211, 305.838 324.440 C 317.818 311.357, 323.557 295.097, 322.756 276.500 C 322.357 267.232, 318.844 252, 317.107 252 C 316.768 252, 296.545 271.950, 272.166 296.334" stroke="none" fill-rule="evenodd"/></svg>
				</div>
			</template>
			<!-- cameras -->
			<div class="w-full flex flex-col space-y-3">
				<label class="relative font-bold text-sm flex justify-between" for="cameras">
					<span>Cámara</span>
					<input v-model="enabledVideo" class="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-black after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-c1-500 checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s]" type="checkbox" role="switch" />
				</label>
				<div class="select-wrapper">
					<select @input="handleCameraChange" id="cameras" class="select-field" :disabled="!enabledVideo">
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
					<select @input="handleMicrophoneChange" id="microphones" class="select-field" :disabled="!enabledAudio">
						<option v-for="(op, index) in microphoneDevices" :key="index" :value="op.value" v-text="op.label"></option>
					</select>
					<div class="select-arrow">
						<svg class="w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" version="1.1"><path d="M 108.534 151.254 C 103.242 152.651, 94.858 161.059, 93.216 166.616 C 91.346 172.947, 91.747 178.931, 94.415 184.500 C 95.964 187.732, 120.924 217.612, 165.002 269 C 202.507 312.725, 235.165 350.581, 237.574 353.125 C 246.906 362.978, 259.127 364.685, 269.609 357.601 C 274.699 354.162, 414.844 190.220, 417.585 184.500 C 422.156 174.960, 420.352 165.301, 412.530 157.431 C 408.823 153.701, 406.252 152.049, 402.803 151.181 C 396.546 149.605, 114.514 149.675, 108.534 151.254" stroke="none" fill-rule="evenodd"/></svg>
					</div>
				</div>
			</div>
			<!-- button -->
			<div class="flex justify-end">
				<button class="rounded bg-c1-500 text-black transition duration-150 ease-in-out hover:bg-c1-400 px-4 py-2">Join to Meeting</button>
			</div>
		</template>
	</div>
</template>