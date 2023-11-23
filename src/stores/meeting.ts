import { ref, type Ref, inject } from 'vue'
import { defineStore } from 'pinia'
import type { MeetingConfig } from '@/types/meeting-config.type'
import type { IMeetingService } from '@/services/meeting.interface'
import type { Meeting } from '@/types/types'

export const useMeetingStore = defineStore('meeting', () => {
  const meetingService: IMeetingService | undefined = inject<IMeetingService>('meetingService')
  const meeting: Ref<Meeting | undefined> = ref(undefined)
  const connected: Ref<boolean> = ref(false)
  const inPreview: Ref<boolean> = ref(true)
  // connected: false,
  //     inPreview: true,
  //     mediaOptions: { audio: true, video: true }

  async function createMeeting (config: MeetingConfig) {
    try {
      const response = await meetingService?.create(config)
      const { data } = response.data
      meeting.value = data
    } catch (e: any) {
      console.log(e);
    }
  }

  return { meeting, createMeeting }
})
