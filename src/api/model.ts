interface BasicUser {
    name: string;
    sex: number;
    age: number;
    introduction: string;
    location: string;
}

interface User extends BasicUser {
    id: number;
    password: string;
    avatar: string;
    role: number;
    createTime: string;
    updateTime: string;
    isDelete: number;
    phone: string;
}

interface BasicHouseInfo {
    id: number;
    location: string;
    layout: string;
    description: string;   
    isDelete: number;
}

interface VerificationForm {
    id: number;
    userId: number;
    submissionDate: string;
    status: number;
    adminId: number;
    verificationDate: string;
    comment: string;
    updateTime: string;
    createTime: string;
    isDelete: number;
    identification: string;
    realName: string;
    houseId: string;
}

export type { BasicUser, User }

