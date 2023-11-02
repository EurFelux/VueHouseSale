export interface BasicUser {
    name: string;
    sex: number;
    age: number;
    introduction: string;
    location: string;
}

export interface User extends BasicUser {
    id: number;
    password: string;
    avatar: string;
    role: number;
    createTime: string;
    updateTime: string;
    isDelete: number;
    phone: string;
}

export const defaultValues = {
    USER_ID : -1,
    USER_NAME : '未登录',
    USER_ROLE : -1,
    USER_AVATAR : '/src/assets/otto.jpg',
    USER_LOCATION : '地球',
    USER_INTRODUCTION : '这个人没有简介',
    USER_SEX : 2,
    USER_AGE : 0,
    USER_PHONE : '00000000000',

    ACCENT_COLOR : '#cccccc',

}

export const sexValue = {
    female : 0,
    male : 1,
    secret : 2,
}

export const sexName = {
    female : '女',
    male : '男',
    secret : '保密',
}

export const roleName = {
    admin : '管理员',
    user : '用户'
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
