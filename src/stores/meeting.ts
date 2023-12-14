import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { MeetingConfig } from '@/types/meeting-config.type'
import type { Meeting } from '@/types/types'
import { useMeetingService } from '@/composables/meeting'

export const useMeetingStore = defineStore('meeting', () => {
  const useMeeting = useMeetingService()
  const meeting: Ref<Meeting | undefined> = ref(undefined)
  const loading: Ref<boolean> = ref(false)
  const connected: Ref<boolean> = ref(false)
  const inPreview: Ref<boolean> = ref(true)
  const mediaOptions: Ref<any> = ref({ audio: true, video: true })
  const errorFormMessage: Ref<string> = ref('')

  async function createMeeting (config: MeetingConfig) {
    try {
      const response = await useMeeting.create(config)
      const { data } = await response.json()
      meeting.value = data
    } catch (e: any) {
      console.log(e);
    }
  }

  async function deleteMeeting () {
    try {
      await useMeeting.stopMeeting(meeting.value?.access_key)
      meeting.value = undefined
    } catch (e: any) {
      console.log(e);
    }
  }

  return { meeting, loading, connected, inPreview, mediaOptions, createMeeting, deleteMeeting, errorFormMessage }
})
