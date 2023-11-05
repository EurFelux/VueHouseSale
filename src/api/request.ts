import type { BasicUser, House } from '@/api/model';


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

/* something should be here */

// -----------------------------------------------------------






// --------------------------- Audit ---------------------------

export interface AuditForm {
    userId: number,
    identification: string,
    realName: string,
	house: House,
}

