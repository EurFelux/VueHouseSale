import { globalConfig, serverUrl } from './api';
import type { UpdatePasswordForm, UpdateUserForm } from '@/api/request';
import type { GetUserResponse, AnyDataResponse, UpdateUserResponse, GetAllUsersResponse } from '@/api/response';

import { useUserStore } from '@/stores/user';

import axios, { type AxiosResponse } from 'axios';

enum Api {
  DeleteUser = '/user/delete',
  GetAllUsers = '/user/allUser',
  GetUser = '/user/detail',
  UpdateUser = '/user/updateInfo',
  UpdatePassowrd = '/user/updatePwd',
  UpdateAvatar = '/user/avatar',
}

// 删除用户
export async function deleteUser(userID: number): Promise<AxiosResponse<AnyDataResponse>> {
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
export async function getAllUsers(): Promise<AxiosResponse<GetAllUsersResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.get(`${serverUrl}${Api.GetAllUsers}`, config);
}

// 获取用户信息
export async function getUser(userID: number): Promise<AxiosResponse<GetUserResponse>> {
  const config = {
    ...globalConfig,
    params: {
      id: userID,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.get(`${serverUrl}${Api.GetUser}`, config);
}

// 更新用户信息
export async function updateUser(updateUserForm: UpdateUserForm): Promise<AxiosResponse<UpdateUserResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.post(`${serverUrl}${Api.UpdateUser}`, updateUserForm, config);
}

// 更新用户密码
export async function updatePassword(UpdatePasswordForm: UpdatePasswordForm): Promise<AxiosResponse<UpdatePasswordForm>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.post(`${serverUrl}${Api.UpdatePassowrd}`, UpdatePasswordForm, config);

}

// 更新用户头像