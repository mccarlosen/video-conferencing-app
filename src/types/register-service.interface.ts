import type { AxiosStatic } from "axios";
import type { CookieData } from "./cookie-data.type";
import type { FormSecretKey } from "./form-secret-key.type";
import type { VueCookies } from "vue-cookies";

export interface IRegisterService {
	BASE_URL: string;
	http: AxiosStatic
	registerWithSecretKey(data: FormSecretKey): Promise<any>
	registerCookie(data: CookieData, $cookies: VueCookies | undefined): Promise<CookieData>
}