import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { MeetingConfig } from '@/types/meeting-config.type'
import type { Meeting } from '@/types/types'
import { useMeetingService } from '@/composables/meeting'

export const useMeetingStore = defineStore('meeting', () => {
  const useMeeting = useMeetingService()
  const meeting: Ref<Meeting | undefined> = ref(undefined)
  const connected: Ref<boolean> = ref(false)
  const inPreview: Ref<boolean> = ref(true)
  const mediaOptions: Ref<object> = ref({ audio: true, video: true })

  async function createMeeting (config: MeetingConfig) {
    try {
      const response = await useMeeting.create(config)
      const { data } = response.data
      meeting.value = data
    } catch (e: any) {
      console.log(e);
    }
  }

  return { meeting, connected, inPreview, mediaOptions, createMeeting }
})
