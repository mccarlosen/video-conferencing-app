import { ref, type Ref, inject } from 'vue'
import { defineStore } from 'pinia'
import type { MeetingConfig } from '@/types/meeting-config.type'
import type { IMeetingService } from '@/services/meeting.interface'
// import type { VueCookies } from 'vue-cookies'
import type { Meeting } from '@/types/types'

export const useGlobalStore = defineStore('global', () => {

  // const $cookies: VueCookies | undefined = inject<VueCookies | undefined>('$cookies')
  const meetingService: IMeetingService | undefined = inject<IMeetingService>('meetingService')
  const meeting: Ref<Meeting | undefined> = ref(undefined)

  async function createMeeting (config: MeetingConfig) {
    try {
      const response = await meetingService?.create(config)
      const { data } = response
      meeting.value = data
      console.log(meeting.value); 
      // await meetingService?.registerCookie(data, $cookies)
    } catch (e: any) {
      const { status, statusText } = e.response;
      if (status == 404) {
        console.log(statusText);
      }
    }
  }

  return { meeting, createMeeting }
})
