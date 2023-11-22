import type { AxiosStatic } from "axios";
import type { MeetingConfig } from "../types/meeting-config.type";

export type IMeetingService = {
	BASE_URL: string;
	http: AxiosStatic
	create(data: MeetingConfig): Promise<any>
}