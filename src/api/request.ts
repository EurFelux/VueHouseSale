import type { BasicUser } from '@/api/model';

interface LoginForm {
    phone: string;
    password: string;
}

interface RegisterForm extends BasicUser {
    phone: string;
    password: string;
    confirmPassword: string;
}

interface UpdateUserForm extends BasicUser{
    id: number,
}

interface UpdatePasswordForm {
    id: number;
    phone: string;
    oldPassword: string;
    password: string;
    confirmPassword: string;
}

export type { LoginForm, RegisterForm, UpdateUserForm, UpdatePasswordForm };



