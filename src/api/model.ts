export const defaultValues = {
    USER_ID: -1,
    USER_PASSWORD: '',
    USER_NAME: '未登录',
    USER_ROLE: -1,
    USER_AVATAR: 'img/house/taffy.png',
    USER_LOCATION: '地球',
    USER_INTRODUCTION: '这个人没有简介',
    USER_SEX: 2,
    USER_AGE: 0,
    USER_PHONE: '00000000000',

    ACCENT_COLOR: '#a98e5a',
    ANY_PIC: 'img/house/taffy.png',

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

export enum Sex {
    Female = 0,
    Male = 1,
    Secret = 2,
}

export enum SexText {
    Female =  '女',
    Male = '男',
    Secret = '保密',
}

interface MapType {
    [key: number]: string;
}

export const SexMap: MapType = {
    [Sex.Female]: SexText.Female,
    [Sex.Male]: SexText.Male,
    [Sex.Secret]: SexText.Secret,
}

export enum Role {
    User = 0,
    Admin = 1,
}

export enum RoleText {
    User = '用户',
    Admin = '管理员',
}

export const RoleMap: MapType = {
    [Role.User]: RoleText.User,
    [Role.Admin]: RoleText.Admin,
}

// --------------
//     住房
// --------------

// 电梯
export enum Elevator {
    No = 0,     // 无电梯
    Yes = 1,    // 有电梯
    Any = 2,    // 任意
    Unknown = 3, // 未知
}

export enum ElevatorText {
    No = '无电梯',
    Yes = '有电梯',
    Any = '任意',
    Unknown = '未知',
}

export const ElevatorMap: MapType = {
    [Elevator.No]: ElevatorText.No,
    [Elevator.Yes]: ElevatorText.Yes,
    [Elevator.Any]: ElevatorText.Any,
    [Elevator.Unknown]: ElevatorText.Unknown,
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
    Unknown = 11,
}

export enum OrientationText {
    East = '东',
    South = '南',
    West = '西',
    North = '北',
    EastSouth = '东南',
    EastNorth = '东北',
    WestSouth = '西南',
    WestNorth = '西北',
    EastWest = '东西',
    SouthNorth = '南北',
    Any = '任意',
    Unknown = '未知',
}

export const OrientationMap: MapType = {
    [Orientation.East]: OrientationText.East,
    [Orientation.South]: OrientationText.South,
    [Orientation.West]: OrientationText.West,
    [Orientation.North]: OrientationText.North,
    [Orientation.EastSouth]: OrientationText.EastSouth,
    [Orientation.EastNorth]: OrientationText.EastNorth,
    [Orientation.WestSouth]: OrientationText.WestSouth,
    [Orientation.WestNorth]: OrientationText.WestNorth,
    [Orientation.EastWest]: OrientationText.EastWest,
    [Orientation.SouthNorth]: OrientationText.SouthNorth,
    [Orientation.Any]: OrientationText.Any,
    [Orientation.Unknown]: OrientationText.Unknown,
}

/**
 * 产权类型
 */
export enum OwnershipType {
    Public = 0,     // 公产
    Private = 1,    // 私产
    Unknown = 2,    // 未知
}

export enum OwnershipTypeText {
    Public = '公产',
    Private = '私产',
    Unknown = '未知',
}

export const OwnershipTypeMap: MapType = {
    [OwnershipType.Public]: OwnershipTypeText.Public,
    [OwnershipType.Private]: OwnershipTypeText.Private,
    [OwnershipType.Unknown]: OwnershipTypeText.Unknown,
}

/**
 * 装修情况
 */
export enum Decoration {
    Simple = 0, // 简装
    Fine = 1,   // 精装
    Any = 2,    // 任意
    Unknown = 3, // 未知
}

export enum DecorationText {
    Simple = '简装',
    Fine = '精装',
    Any = '任意',
    Unknown = '未知',
}

export const DecorationMap: MapType = {
    [Decoration.Simple]: DecorationText.Simple,
    [Decoration.Fine]: DecorationText.Fine,
    [Decoration.Any]: DecorationText.Any,
    [Decoration.Unknown]: DecorationText.Unknown,
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
    houseId: string;               // 房产id
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
    pic: Array<string>;        // 房屋图片
    house: House;       // 房产信息
}

/**
 * 出租类型
 */
export enum RentType {
    Entire = 0, // 整租
    Joint = 1,  // 合租
    Any = 2,    // 任意
    Unknown = 3, // 未知
}

export enum RentTypeText {
    Entire = '整租',
    Joint = '合租',
    Any = '任意',
    Unknown = '未知',
}

export const RentTypeMap: MapType = {
    [RentType.Entire]: RentTypeText.Entire,
    [RentType.Joint]: RentTypeText.Joint,
    [RentType.Any]: RentTypeText.Any,
    [RentType.Unknown]: RentTypeText.Unknown,
}

/**
 * 出租信息
 */
export interface Rent extends BasicInfo {
    type: RentType;         // 出租类型
    price: number;          // 租金/月
    pic: Array<string>;            // 房屋图片
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
    type: RentType;             // 求租类型
    budget: number;             // 预算/月
    period: number;             // 租期/月
    requirement: string;        // 求租要求：其他要求
}


/**
 * 审核状态
 */
export enum AuditStatus {
    pending = 0,
    approved = 1,
    rejected = 2
}

export enum AuditStatusText {
    pending = '待审核',
    approved = '已通过',
    rejected = '已驳回'
}

export const AuditStatusMap: MapType = {
    [AuditStatus.pending]: AuditStatusText.pending,
    [AuditStatus.approved]: AuditStatusText.approved,
    [AuditStatus.rejected]: AuditStatusText.rejected,
}

/**
 * 审核信息
 */
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
