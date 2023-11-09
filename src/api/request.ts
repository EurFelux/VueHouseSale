import type { AuditStatus, BasicHouse, BasicUser, Elevator, House, Orientation } from '@/api/model';


// --------------------------- Auth ---------------------------

export interface LoginForm {
    phone: string;
    password: string;
}

export interface RegisterForm extends BasicUser {
    phone: string;
    password: string;
    confirmPassword: string;
}

// -----------------------------------------------------------










// --------------------------- User ---------------------------

export interface UpdateUserForm extends BasicUser{
    id: number,
}

export interface UpdatePasswordForm {
    id: number;
    phone: string;
    oldPassword: string;
    password: string;
    confirmPassword: string;
}

// -----------------------------------------------------------










// --------------------------- Sell ---------------------------

export interface SellForm {
    userId: number;
    description: string;
    price: number;
    pic: string;
    contact: string;
    house: House;
}


// -----------------------------------------------------------


// --------------------------- Rent ---------------------------

export interface RentForm {
    userId: number;
    type: number;
    price: number;
    minPeriod: number;
    requirement: string;
    furniture: string;
    pic: string;
    description: string;
    contact: string;
    house: House;
}

// -----------------------------------------------------------

// --------------------------- Buy ---------------------------

export interface BuyForm extends BasicHouse {
    userId: number;
    description: string;
    budget: number;
    contact: string;
}

// -----------------------------------------------------------

// --------------------------- Seek ---------------------------

export interface SeekForm extends BasicHouse {
    userId: number,
    type: number,
    budget: number,
    period: number,
    requirement: string,
    description: string,
    contact: string,
}

// -----------------------------------------------------------



// --------------------------- Audit ---------------------------

export interface AuditRequestForm {
    userId: number,
    identification: string,
    realName: string,
	house: House,
}

export interface AuditForm {
    id: number,
    status: AuditStatus,
    adminId: number,
    comment: string,
}