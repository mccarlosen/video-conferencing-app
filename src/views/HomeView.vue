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
  <div class="flex items-center gap-x-8 h-full">
		<div class="w-1/2 text-left">
			<h1 class="text-5xl font-bold leading-tight mb-5">Welcome to Video Conferencing App</h1>
			<p class="text-lg font-light text-gray-700">This is a demo that uses the <a href="https://www.eyeson.com/eyeson-video-call-api-overview" target="_blank" class="underline text-c1-600 transition duration-150 ease-in-out hover:text-c1-500">Eyeson API</a></p>
		</div>
		<div class="w-1/2">
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
						<FormWithAccessKey />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>