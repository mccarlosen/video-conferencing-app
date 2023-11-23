<script setup lang="ts">
import { onMounted, ref, type Ref } from 'vue';
import { useMeetingStore } from '@/stores/meeting';
import FormCreateMeeting from '@/components/FormCreateMeeting.vue';

const meetingStore = useMeetingStore()
const currentTab: Ref<string> = ref('tab1')
const setCurrentTab = (tab: string) => {
	currentTab.value = tab
}

onMounted(() => {
	console.log(meetingStore.meeting)
})
</script>

<template>
  <div class="flex items-center gap-x-8 h-full">
		<div class="w-1/2 text-left">
			<h1 class="text-5xl font-bold leading-tight mb-5">Welcome to Video Conferencing App</h1>
			<p class="text-lg font-light text-gray-700">This is a demo that uses the <a href="https://www.eyeson.com/eyeson-video-call-api-overview" target="_blank" class="underline text-c1-600 transition duration-150 ease-in-out hover:text-c1-500">Eyeson API</a></p>
		</div>
		<div class="w-1/2">
			<div v-if="meetingStore.meeting">
				Hello, {{ meetingStore.meeting.user.name }}
			</div>
			<div v-if="!meetingStore.meeting">
				<ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
					<li class="me-2">
							<a href="#" @click.prevent="setCurrentTab('tab1')" class="inline-block p-4 rounded-t-lg" :class="{'active': currentTab === 'tab1', 'bg-gray-50 hover:text-gray-600 hover:bg-gray-100': currentTab !== 'tab1'}">Create Meeting</a>
					</li>
					<li class="me-2">
							<a href="#" @click.prevent="setCurrentTab('tab2')" class="inline-block p-4 rounded-t-lg" :class="{'active': currentTab === 'tab2', 'bg-gray-50 hover:text-gray-600 hover:bg-gray-100': currentTab !== 'tab2'}">Get Started with Meeting Access Key</a>
					</li>
				</ul>
				<div class="border rounded-b-lg p-5 shadow-lg">
					<div id="tab1" v-if="currentTab === 'tab1'">
						<FormCreateMeeting />
					</div>
					<div id="tab2" v-if="currentTab === 'tab2'">
						<form action="" class="space-y-5">
							<div class="flex flex-col">
								<label for="access-key" class="mb-2 inline-flex items-center">
									Your Meeting Access Key 
									<span><svg class="w-4 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM169.8 165.3c7.9-22.3 29.1-37.3 52.8-37.3h58.3c34.9 0 63.1 28.3 63.1 63.1c0 22.6-12.1 43.5-31.7 54.8L280 264.4c-.2 13-10.9 23.6-24 23.6c-13.3 0-24-10.7-24-24V250.5c0-8.6 4.6-16.5 12.1-20.8l44.3-25.4c4.7-2.7 7.6-7.7 7.6-13.1c0-8.4-6.8-15.1-15.1-15.1H222.6c-3.4 0-6.4 2.1-7.5 5.3l-.4 1.2c-4.4 12.5-18.2 19-30.6 14.6s-19-18.2-14.6-30.6l.4-1.2zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg></span>
								</label>
								<input type="text" id="access-key" class="input-field mb-2" placeholder="Example: JyGuwNFgmoBYuxmgjXegMjQ2">
								<p class="text-sm font-light text-gray-600">Get an user access key from starting a meeting via the API or use one from an active meeting.</p>
							</div>
							<div class="flex justify-end">
								<button class="rounded bg-c1-500 text-black transition duration-150 ease-in-out hover:bg-c1-400 px-4 py-2">Join to Meeting</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>