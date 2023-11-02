import { globalConfig, serverUrl } from './api';
import type { UpdatePasswordForm, UpdateUserForm } from '@/api/request';
import type { GetUserResponse, AnyDataResponse, UpdateUserResponse } from '@/api/response';

import { useUserStore } from '@/stores/user';

import axios, { type AxiosResponse } from 'axios';

enum Api {
  DeleteUser = '/user/delete',
  GetAllUser = '/user/allUser',
  GetUser = '/user/detail',
  UpdateUser = '/user/updateInfo',
  UpdatePassowrd = '/user/updatePwd',
  UpdateAvatar = '/user/avatar',
}

// 删除用户
async function deleteUser(userID: number): Promise<AxiosResponse<AnyDataResponse>> {
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
async function getAllUser(): Promise<AxiosResponse<AnyDataResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.get(`${serverUrl}${Api.GetAllUser}`, config);
}

// 获取用户信息
async function getUser(userID: number): Promise<AxiosResponse<GetUserResponse>> {
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
async function updateUser(updateUserForm: UpdateUserForm): Promise<AxiosResponse<UpdateUserResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.post(`${serverUrl}${Api.UpdateUser}`, updateUserForm, config);
}
// 更新用户密码
async function updatePassword(UpdatePasswordForm: UpdatePasswordForm): Promise<AxiosResponse<UpdatePasswordForm>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }
  return await axios.post(`${serverUrl}${Api.UpdatePassowrd}`, UpdatePasswordForm, config);

}

// 更新用户头像

// 导出
export { deleteUser, getAllUser, getUser, updateUser, updatePassword };