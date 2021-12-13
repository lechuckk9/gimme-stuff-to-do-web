import { Mission } from "./mission";
import { Paging } from "./paging";

export interface ApiResponsePage {
	data: Mission[];
	message: string;
	page: Paging;
	resultCode: number;
}