export type MeetingInfo = {
	access_key: string;
	user: {
		id: string;
		room_id: string;
		name: string;
		avatar: null;
        guest: boolean;
        blocked: boolean;
        ready: boolean;
	};
	userName: string;
	roomId: string
	roomName: string;
	token: string;
}