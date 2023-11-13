import { type Audit, type Buy, type Rent, type Seek, type Sell, type User } from "./model";

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

// --------------------- auth ---------------------

export type RegisterResponse = AnyDataResponse;

export interface LoginResponse extends BasicResponse {
    data: {
        access_token: string;
        refresh_token: string;
        expire_in: number;
        user: User;
    }
}

// ------------------------------------------------







// --------------------- user ---------------------

export interface GetUserResponse extends BasicResponse {
    data: User;
}

export interface UpdateUserResponse extends BasicResponse {
    data: User;
}

export interface GetAllUsersResponse extends BasicResponse {
    data: Array<User>;
}

export interface UpdateAvatarResponse extends BasicResponse {
    data: null;
}

// ------------------------------------------------







// --------------------- sell ---------------------
export interface SellResponse extends Sell {
    createTime: string;
    updateTime: string;
    isDelete: number;
}

export interface AddSellResponse extends BasicResponse {
    data: null;
}

export interface GetSellInfoByIdResponse extends BasicResponse {
    data: SellResponse;
}

export interface GetAllSellInfoResponse extends BasicResponse {
    data: Array<SellResponse>;
}

export interface GetAllSellInfoByUserIdResponse extends BasicResponse {
    data: Array<SellResponse>;
}

export interface DeleteSellInfoByIdResponse extends BasicResponse {
    data: null;
}


// ------------------------------------------------








// --------------------- rent ---------------------

export interface RentResponse extends Rent {
    createTime: string;
    updateTime: string;
    isDelete: number;
}

export interface AddRentResponse extends BasicResponse {
    data: null;
}

export interface GetAllRentInfoByUserIdResponse extends BasicResponse {
    data: Array<RentResponse>;
}

export interface GetAllRentInfoResponse extends BasicResponse {
    data: Array<RentResponse>;
}

export interface DeleteRentInfoByIdResponse extends BasicResponse {
    data: null;
}

// ------------------------------------------------











// --------------------- buy ---------------------

export interface BuyResponse extends Buy {
    createTime: string;
    updateTime: string;
    isDelete: number;
}

export interface AddBuyResponse extends BasicResponse {
    data: null;
}

export interface GetAllBuyInfoByUserIdResponse extends BasicResponse {
    data: Array<BuyResponse>;
}

export interface GetAllBuyInfoResponse extends BasicResponse {
    data: Array<BuyResponse>;
}

export interface DeleteBuyInfoByIdResponse extends BasicResponse {
    data: null;
}

// ------------------------------------------------










// --------------------- seek ---------------------

export interface SeekResponse extends Seek {
    createTime: string;
    updateTime: string;
    isDelete: number;
}

export interface AddSeekResponse extends BasicResponse {
    data: null;
}

export interface GetAllSeekInfoByUserIdResponse extends BasicResponse {
    data: Array<SeekResponse>;
}

export interface GetAllSeekInfoResponse extends BasicResponse {
    data: Array<SeekResponse>;
}

export interface DeleteSeekInfoByIdResponse extends BasicResponse {
    data: null;
}

// ------------------------------------------------










// --------------------- audit ---------------------

export interface GetAuditsByUserResponse extends BasicResponse {
    data: Array<Audit>;
}

export interface GetAuditedAuditsByUserResponse extends BasicResponse {
    data: Array<Audit>;
}

export interface GetAllNotAuditedAuditsResponse extends BasicResponse {
    data: Array<Audit>;
}

export interface AuditResponse extends BasicResponse {
    data: null;
}