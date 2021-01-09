import { BaseModel } from "./base-model";

export interface MotociclistaLocationModel extends BaseModel {
    userId: number;
    userName: string;
    latitude: string;
    longitude: string;
}
