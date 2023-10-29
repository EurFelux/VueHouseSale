import type { LoginForm, RegisterForm } from '@/api/request';
import type { RegisterResponse, LoginResponse, NoDataResponse } from '@/api/response';
import { useUserStore } from '@/stores/user';
import axios, { type AxiosResponse } from 'axios';
import { globalConfig, serverUrl } from './api';



enum Api {
  DeleteUser = '/user/delete',
  GetAllUser = '/user/allUser',
  GetUser = '/userDetailed',
  UpdateUser = '/user/updateInfo',
  UpdatePassowrd = '/user/updatePwd',
  UpdateAvatar = '/user/avatar',
}

// 删除用户
async function deleteUser(userID: number): Promise<AxiosResponse<NoDataResponse>> {
  const config = {
    ...globalConfig,
    params: {
      userId: userID,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.post(`${serverUrl}${Api.DeleteUser}`, null, config);
}

// 获取所有用户
async function getAllUser(): Promise<AxiosResponse<NoDataResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.get(`${serverUrl}${Api.GetAllUser}`, config);
}

// 获取用户信息
async function getUser(userID: number): Promise<AxiosResponse<NoDataResponse>> {
  const config = {
    ...globalConfig,
    params: {
      userId: userID,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.get(`${serverUrl}${Api.GetUser}`, config);
}

// 更新用户信息

// 更新用户密码

// 更新用户头像

// 导出
export { deleteUser, getAllUser, getUser };