import { ref, type Ref, inject } from 'vue'
import { defineStore } from 'pinia'
import type { FormSecretKey } from '@/types/form-secret-key.type'
import type { IRegisterService } from '@/types/register-service.interface'
import type { VueCookies } from 'vue-cookies'

export const useGlobalStore = defineStore('global', () => {

  const $cookies: VueCookies | undefined = inject<VueCookies | undefined>('$cookies')
  const registerService: IRegisterService | undefined = inject<IRegisterService>('RegisterService')
  const authenticated: Ref<boolean> = ref(false)
  const userName: Ref<string | undefined> = ref('')
  const cookieName: Ref<string | undefined> = ref('')
  // const roomName: Ref<string> = ref('')

  async function registerWithSecretKey (form: FormSecretKey) {
    try {
      const response = await registerService?.registerWithSecretKey(form)
      const cookieData = await registerService?.registerCookie(response.data, $cookies)
      authenticated.value = true
      userName.value = cookieData?.username
      cookieName.value = cookieData?.cookieName
    } catch (e) {
      console.log(e);
    }
  }

  return { authenticated, userName, cookieName, registerWithSecretKey }
})
