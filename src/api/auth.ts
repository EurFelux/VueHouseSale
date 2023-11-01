import { globalConfig, serverUrl } from './api';
import type { LoginForm, RegisterForm } from '@/api/request';
import type { RegisterResponse, LoginResponse, AnyDataResponse } from '@/api/response';

import { useUserStore } from '@/stores/user';

import axios, { type AxiosResponse } from 'axios';

enum Api {
  Register = '/auth/register',
  Login = '/auth/login',
  Logout = '/auth/logout',
}

// 注册
async function register(form: RegisterForm): Promise<AxiosResponse<RegisterResponse>> {
  let dataToSend = {
    ...form,
    confirmPassword: undefined,
  }
  delete dataToSend.confirmPassword

  const config = {
    ...globalConfig,
  }
  return await axios.post(`${serverUrl}${Api.Register}`, dataToSend, config);
}

// 登录
async function login(form: LoginForm): Promise<AxiosResponse<LoginResponse>> {
  return await axios.post(`${serverUrl}${Api.Login}`, form, globalConfig);
}

// 登出
async function logout(userID: number): Promise<AxiosResponse<AnyDataResponse>> {
  const config = {
    ...globalConfig,
    params: {
      userId: userID,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.post(`${serverUrl}${Api.Logout}`, null, config);
}

// 导出
export { register, login, logout };