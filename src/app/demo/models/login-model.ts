import { BaseModel } from './base-model';

export interface LoginModel extends BaseModel {
    login: string;
    userName?: string;
    token?: string;
    refreshToken?: string


}
