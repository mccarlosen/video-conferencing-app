import type { CookieData } from '@/types/cookie-data.type'
import type { FormSecretKey } from '@/types/form-secret-key.type'
import type { IRegisterService } from '@/types/register-service.interface'
import axios, { type AxiosStatic } from 'axios'
import type { VueCookies } from 'vue-cookies'

class RegisterService implements IRegisterService {
  BASE_URL: string = 'http://127.0.0.1:3333/api'
  http: AxiosStatic = axios
  
  async registerWithSecretKey(data: FormSecretKey): Promise<any> {
    return await this.http.post(`${this.BASE_URL}/start-with-secret-key`, data)
  }

  registerCookie(data: CookieData, $cookies: VueCookies | undefined) : Promise<CookieData> {
    return new Promise((resolve, reject) => {
      try {
        // register cookie
        $cookies?.set(data.cookieName, data, '1h')
        // verify
        if ($cookies?.isKey(data.cookieName)) {
          resolve(data)
        } else {
          reject(new Error('Error saving cookie'))
        }
      } catch (e) {
        reject(e)
      }
    })
  }
}

export const registerService = new RegisterService()