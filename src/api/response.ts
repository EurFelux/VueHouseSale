import { type User } from "./model";

interface BasicResponse {
    code: number;
    message: string;
    time: string;
    timestamp: number;
}

export interface NoDataResponse extends BasicResponse {
    data: any;
}

export type RegisterResponse = NoDataResponse;

export interface LoginResponse extends BasicResponse {
    data: {
        access_token: string;
        refresh_token: string;
        expire_in: number;
        user: User;
    }
}

