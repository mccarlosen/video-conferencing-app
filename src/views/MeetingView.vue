<script setup lang="ts">
import { onMounted } from 'vue';
import { useMeetingStore } from '@/stores/meeting';
import MeetingComponent from '@/components/MeetingComponent.vue'
import PreviewComponent from '@/components/PreviewComponent.vue'

const meetingStore = useMeetingStore()
onMounted(() => {
	// console.log(meetingStore.inPreview);
})
</script>

<template>
  <div class="flex w-full h-full bg-white">
		<div class="flex-1 flex items-center justify-center">
			<template v-if="meetingStore.inPreview && !meetingStore.connected">
				<PreviewComponent />
			</template>
			<template v-if="!meetingStore.inPreview">
				<MeetingComponent />
			</template>
		</div>
  </div>
</template>