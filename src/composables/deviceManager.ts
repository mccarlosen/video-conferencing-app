import { DeviceManager } from 'eyeson'
export function useDeviceManager() {
	const deviceManager = new DeviceManager()
	return deviceManager
}
export function useGetSelectedDeviceId (stream: any, type: string) {
	try {
	  const tracks = stream[`get${type}Tracks`]();
	  if (tracks.length > 0) {
		const settings = tracks[0].getSettings();
		return settings.deviceId;
	  }
	} catch (error) {
	  console.error(error);
	}
	return '';
};
export const useMapDeviceList = (device: any) => ({ value: device.deviceId, label: device.label });
