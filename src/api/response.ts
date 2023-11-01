import { type User } from "./model";

export enum ResponseCode {
    SUCCESS = 200,
    ERROR = 500,
    BAD_TOKEN = 2002,
    USER_EXISTS = 500110,
    REGISTER_ERROR = 500120,
    PHONE_EXISTS = 500130,
    USER_NOT_EXIST = 500210,
    PASSWORD_WRONG = 500220,
    ADD_ERROR = 500310,
    DELETE_ERROR = 500320,
    UPDATE_INFO_ERROR = 500330,
    UPDATE_PWD_ERROR = 500340,
    UPDATE_AVATAR_ERROR = 500350,
    ACCESS_DENIED = 500410,
    SEARCH_NOT_EXIST = 500510
}

interface BasicResponse {
    code: ResponseCode;
    message: string;
    time: string;
    timestamp: number;
}

export interface AnyDataResponse extends BasicResponse {
    data: any;
}

export type RegisterResponse = AnyDataResponse;

export interface LoginResponse extends BasicResponse {
    data: {
        access_token: string;
        refresh_token: string;
        expire_in: number;
        user: User;
    }
}

export interface GetUserResponse extends BasicResponse {
    data: User;
}

export interface UpdateUserResponse extends BasicResponse {
    data: User;
}