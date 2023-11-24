import type { MeetingConfig } from "@/types/meeting-config.type"
import { ref, type Ref } from "vue"

export function useMeetingService() {

  const API_URL = import.meta.env.VITE_API_URL
  const EYESON_API_URL = import.meta.env.VITE_EYESON_API_URL

  async function create(data: MeetingConfig) : Promise<any> {
    return fetch(`${API_URL}/create`, {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  function checkAccessKey(accessKey: string | string[]) {
    const status: Ref<number | null> = ref(null)
    fetch(`${EYESON_API_URL}/rooms/${accessKey}`)
      .then((res) => (status.value = res.status))
      .catch((err) => (console.log(err.message)))
    return { status }
  }

  return { create, checkAccessKey }
  
}