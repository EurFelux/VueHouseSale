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

export type { LoginForm, RegisterForm, UpdateUserForm };



