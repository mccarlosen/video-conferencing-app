<script setup lang="ts">
import { onMounted, onUnmounted, ref, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import eyeson from 'eyeson';
import { useMeetingStore } from '@/stores/meeting';
import MeetingComponent from '@/components/MeetingComponent.vue'
import PreviewComponent from '@/components/PreviewComponent.vue'

const route = useRoute()
const router = useRouter()
const meetingStore = useMeetingStore()
const error: Ref<string | null> = ref(null)

function handleEvent(event: any) {
	const { type, connectionStatus } = event;
	console.log(`Eyeson eventeeee ${type}`);

	if (type === 'disconnect') {
		console.log("holaaaaaaaaaa");
		meetingStore.loading = false
		meetingStore.connected = false
		return;
	}

	if (type !== 'connection') {
		return;
	}

	if (!['initialize', 'fetch_room', 'received_room', 'ready'].includes(connectionStatus)) {
		meetingStore.loading = false
		error.value = connectionStatus
		console.error(connectionStatus);
		return;
	}

	if (connectionStatus === 'ready') {
		meetingStore.loading = false
		meetingStore.connected = true
	}
};

function onStart() {
	meetingStore.loading = true
	eyeson.connect(route.params.id)
}

function onJoin() {
	meetingStore.inPreview = false
}

function onEndMeeting() {
	eyeson.destroy()
	meetingStore.deleteMeeting()
	meetingStore.inPreview = true
	meetingStore.loading = true
	router.push({ name: 'home' })
}

onUnmounted(() => {
	eyeson.offEvent(handleEvent)
})

onMounted(() => {
	eyeson.onEvent(handleEvent)
	onStart()
})
</script>

<template>
  <div class="flex w-full h-full bg-white">
		<div class="flex-1 flex items-center justify-center">
			<svg v-if="meetingStore.loading" class="animate-spin w-10 h-10 fill-c1-300 mr-2 text-c1-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
				<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
			<template v-else>
				<template v-if="error">
					<div>Ha ocurrido un error <span class="rounded bg-red-500 text-white p-1">{{ error }}</span></div>
				</template>
				<template v-if="meetingStore.inPreview && meetingStore.connected && !error">
					<PreviewComponent @on-join="onJoin" @on-end-meeting="onEndMeeting" />
				</template>
				<template v-if="!error && !meetingStore.inPreview && meetingStore.connected">
					<MeetingComponent @on-end-meeting="onEndMeeting" />
				</template>
			</template>
		</div>
  </div>
</template>