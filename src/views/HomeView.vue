<script setup lang="ts">
import { watch, ref, type Ref } from 'vue';
import { useMeetingStore } from '@/stores/meeting';
import FormCreateMeeting from '@/components/FormCreateMeeting.vue';
import FormWithAccessKey from '@/components/FormWithAccessKey.vue';

const meetingStore = useMeetingStore()
const currentTab: Ref<string> = ref('tab1')
const setCurrentTab = (tab: string) => {
	currentTab.value = tab
}
watch(currentTab, () => {
	meetingStore.errorFormMessage = ''
})
</script>

<template>
  <div class="flex flex-col items-center gap-y-8 lg:gap-y-0 lg:flex-row md:gap-x-8 h-full px-5 py-10">
		<div class="w-full md:px-16 lg:px-0 lg:w-1/2 text-left">
			<h1 class="text-4xl sm:text-5xl font-bold leading-tight mb-5">Welcome to Video Conferencing App</h1>
			<p class="text-base sm:text-lg font-light text-gray-700">This is a demo that uses the <a href="https://www.eyeson.com/eyeson-video-call-api-overview" target="_blank" class="underline text-c1-600 transition duration-150 ease-in-out hover:text-c1-500">Eyeson API</a></p>
		</div>
		<div class="w-full md:px-16 lg:px-0 lg:w-1/2">
			<div v-if="!meetingStore.meeting">
				<ul class="flex overflow-x-auto text-xs sm:text-sm font-medium text-center text-gray-500 border-b border-gray-200">
					<li class="flex-shrink-0 me-2">
						<a href="#" @click.prevent="setCurrentTab('tab1')" class="inline-block p-3 sm:p-4 rounded-t-lg" :class="{'active': currentTab === 'tab1', 'bg-gray-50 hover:text-gray-600 hover:bg-gray-100': currentTab !== 'tab1'}">Create Meeting</a>
					</li>
					<li class="flex-shrink-0 me-2">
						<a href="#" @click.prevent="setCurrentTab('tab2')" class="inline-block p-3 sm:p-4 rounded-t-lg" :class="{'active': currentTab === 'tab2', 'bg-gray-50 hover:text-gray-600 hover:bg-gray-100': currentTab !== 'tab2'}">Get Started with Meeting Access Key</a>
					</li>
				</ul>
				<div class="border rounded-b-lg p-5 shadow-lg">
					<div id="tab1" v-if="currentTab === 'tab1'">
						<FormCreateMeeting />
					</div>
					<div id="tab2" v-if="currentTab === 'tab2'">
						<FormWithAccessKey />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>