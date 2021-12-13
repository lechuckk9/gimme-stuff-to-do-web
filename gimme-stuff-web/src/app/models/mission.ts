import { MissionState } from "./missionState";
import { MissionType } from "./missionType";

export interface Mission {
	title: string;
	description: string;
	type: MissionType;
	state: MissionState;
	typeString: string;
	stateString: string;
	userAssignee: number;
	userAuthor: number;
}