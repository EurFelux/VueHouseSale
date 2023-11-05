export const defaultValues = {
    USER_ID: -1,
    USER_PASSWORD: '',
    USER_NAME: '未登录',
    USER_ROLE: -1,
    USER_AVATAR: '/src/assets/otto.jpg',
    USER_LOCATION: '地球',
    USER_INTRODUCTION: '这个人没有简介',
    USER_SEX: 2,
    USER_AGE: 0,
    USER_PHONE: '00000000000',

    ACCENT_COLOR: '#cccccc',
    ANY_PIC: '/src/assets/otto.jpg',

    HOUSE_ID: -1,
    HOUSE_LOCATION: '地球',
    HOUSE_DESCRIPTION: '这个人很懒，什么都没写',
    HOUSE_OWNERSHIP_TYPE: -1,
    HOUSE_LAYOUT: '未知',
    HOUSE_ORIENTATION: -1,
    HOUSE_FLOOR: '未知',
    HOUSE_ELEVATOR: -1,
    HOUSE_AREA: 0,
    HOUSE_DECORATION: -1,

    INFO_ID: -1,

    SELL_PRICE: 0,

    RENT_TYPE: -1,
    RENT_PRICE: 0,
    RENT_MIN_PERIOD: 0,
    RENT_REQUIREMENT: '无',
    RENT_FURNITURE: '无',

    BUY_BUDGET: 0,
    BUY_DESCRIPTION: '无',

    SEEK_BUDGET: 0,
    SEEK_PERIOD: 0,
    SEEK_DESCRIPTION: '无',

    AUDIT_ID: -1,
    AUDIT_USER_ID: -1,
    AUDIT_SUBMISSION_DATE: '1970-01-01',
    AUDIT_STATUS: -1,
    AUDIT_ADMIN_ID: -1,
    AUDIT_VERIFICATION_DATE: '1970-01-01',
    AUDIT_COMMENT: '无',
    AUDIT_IDENTIFICATION: '',
    AUDIT_REAL_NAME: '',

}

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


export const sexValue = {
    female: 0,
    male: 1,
    secret: 2,
}

export const sexName = {
    female: '女',
    male: '男',
    secret: '保密',
}

export const roleName = {
    admin: '管理员',
    user: '用户'
}

// --------------
//     住房
// --------------

// 电梯
export enum Elevator {
    No = 0,     // 无电梯
    Yes = 1,    // 有电梯
    Any = 2,    // 任意
}

/**
 * 朝向
 */
export enum Orientation {
    East = 0,
    South = 1,
    West = 2,
    North = 3,
    EastSouth = 4,
    EastNorth = 5,
    WestSouth = 6,
    WestNorth = 7,
    EastWest = 8,
    SouthNorth = 9,
    Any = 10,
}

/**
 * 产权类型
 */
export enum OwnershipType {
    Public = 0,     // 公产
    Private = 1,    // 私产
}

/**
 * 装修情况
 */
export enum Decoration {
    Simple = 0, // 简装
    Fine = 1,   // 精装
    Any = 2,    // 任意
}

/**
 * 房产基本信息
 */
export interface BasicHouse {
    location: string;           // 位置
    decoration: Decoration;     // 装修情况
    layout: string;             // 户型
    orientation: Orientation;   // 朝向
    floor: string;              // 楼层
    elevator: Elevator;          // 有无电梯
    area: number;               // 面积
}

/**
 * 房产信息
 */
export interface House extends BasicHouse {
    houseId: number;               // 房产id
    ownershipType: OwnershipType;  // 产权类型
}

/**
 * 基本信息
 */
export interface BasicInfo {
    id: number;             // 信息id
    userId: number;        // 发布者id
    contact: string;        // 联系方式 手机号
    description: string;    // 描述
}

/**
 * 出售信息
 */
export interface Sell extends BasicInfo {
    price: number;      // 价格
    pic: string;        // 房屋图片
    house: House;       // 房产信息
}

/**
 * 出租类型
 */
export enum RentType {
    Entire = 0, // 整租
    Joint = 1,  // 合租
    Any = 2,    // 任意
}

/**
 * 出租信息
 */
export interface Rent extends BasicInfo {
    type: RentType;         // 出租类型
    price: number;          // 租金/月
    pic: string;            // 房屋图片
    minPeriod: number;     // 最短租期/月
    requirement: string;    // 出租要求：对租房人员的要求
    furniture: string;      // 家具家电情况
    house: House;           // 房产信息
}

/**
 * 求购信息
 */
export interface Buy extends BasicInfo, BasicHouse {
    budget: number;             // 预算
}

/**
 * 求租信息
 */
export interface Seek extends BasicInfo, BasicHouse {
    budget: number;             // 预算/月
    period: number;             // 租期/月
}

// --------------
//     审核
// --------------

export enum AuditStatus {
    pending = 0,
    approved = 1,
    rejected = 2
}

export interface Audit {
    id: number;                 // 审核id
    userId: number;            // 用户id
    submissionDate: string;    // 提交日期
    status: AuditStatus;        // 审核状态
    adminId: number;           // 审核人id
    verificationDate: string;  // 审核日期
    comment: string;            // 审核意见

    identification: string;     // 身份证
    realName: string;          // 真实姓名
    house: House;               // 房产信息
}
