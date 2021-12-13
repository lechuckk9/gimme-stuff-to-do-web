import { Mission } from "./mission";

export interface ApiResponse {
	missions: Mission;
	message: string;
	resultCode: number;
}