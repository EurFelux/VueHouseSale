import type { BasicUser } from '@/api/model';

interface LoginForm {
    phone: string;
    password: string;
}

interface RegisterForm extends BasicUser {
    confirmPassword: string;
}

export type { LoginForm, RegisterForm };



