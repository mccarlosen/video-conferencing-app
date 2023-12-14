import type { MeetingConfig } from "@/types/meeting-config.type"

export function useMeetingService() {

  const BASE_API_URL = import.meta.env.VITE_BASE_API_URL
  const EYESON_API_URL = import.meta.env.VITE_EYESON_API_URL

  async function create(data: MeetingConfig) : Promise<any> {
    return fetch(`${BASE_API_URL}/create`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data)
    })
  }

  function checkAccessKey(accessKey: any) {
    return fetch(`${EYESON_API_URL}/rooms/${accessKey}`)
  }

  function stopMeeting(accessKey: any) {
    return fetch(`${EYESON_API_URL}/rooms/${accessKey}`, {
      method: 'DELETE'
    })
  }

  return { create, checkAccessKey, stopMeeting }
  
}