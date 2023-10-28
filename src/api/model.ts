interface BasicUser {
    name: string;
    password: string;
    phone: string;
    sex: number;
    age: number;
    introduction: string;
    location: string;
}

interface User extends BasicUser {
    id: number;
    avatar: string;
    role: number;
    createTime: string;
    updateTime: string;
    isDelete: number;
}

export type { BasicUser, User }

