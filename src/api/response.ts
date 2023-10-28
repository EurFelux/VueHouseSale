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
        token: string;
    }
}

