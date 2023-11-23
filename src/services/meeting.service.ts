import type { MeetingConfig } from '@/types/meeting-config.type'
import type { IMeetingService } from '@/services/meeting.interface'
import axios, { type AxiosStatic } from 'axios'

class MeetingService implements IMeetingService {
  BASE_URL: string = 'http://127.0.0.1:3333/api'
  http: AxiosStatic = axios
  
  async create(data: MeetingConfig): Promise<any> {
    return await this.http.post(`${this.BASE_URL}/create`, data)
  }
}

export const meetingService = new MeetingService()