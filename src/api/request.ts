import type { BasicUser } from '@/api/model';

interface LoginForm {
    phone: string;
    password: string;
}

export type { LoginForm };

export type RegisterForm = BasicUser;

