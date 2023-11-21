import axios, { type AxiosStatic } from 'axios'

type FormSecretKey = {
  username: string,
  secretKey: string
}

/* interface Token {
  token: string
}

interface RegisterResponse {
  response: boolean,
  data: Token
} */

export class RegisterService {
  BASE_URL: string = 'http://127.0.0.1:3333/api'

  constructor(private http: AxiosStatic) {
    this.http = axios
  }

  async registerWithSecretKey(data: FormSecretKey): Promise<AxiosStatic> {
    return await this.http.post(`${this.BASE_URL}/start-with-secret-key`, data)
  }
}