import { globalConfig, serverUrl } from './api';
import type { BuyForm, SeekForm, SellForm, UpdateSeekForm } from '@/api/request';
import type { AddSeekResponse, DeleteSeekInfoByIdResponse, GetAllSeekInfoByUserIdResponse, GetSeekInfoByIdResponse, UpdateSeekInfoResponse } from '@/api/response';

import { useUserStore } from '@/stores/user';

import axios, { Axios, type AxiosResponse } from 'axios';

enum Api {
  AddSeek = '/rent/req/add',
  GetSeekInfoById = '/rent/req/byId',
  GetAllSeekInfoByUserId = '/rent/req/allById',
  GetAllSeekInfo = '/rent/req/all',
  DeleteSeekInfoById = '/rent/req/delete',
  UpdateSeekInfo = '/rent/req/update',
}

/**
 * 添加求租信息
 * @param form 求租信息表单
 */
export async function addSeek(form: SeekForm): Promise<AxiosResponse<AddSeekResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.post(`${serverUrl}${Api.AddSeek}`, form, config);
}

/**
 * 获取指定id的求租信息
 * @param seekId 求租信息id
 */
export async function getSeekInfoById(seekId: number): Promise<AxiosResponse<GetSeekInfoByIdResponse>> {
  const config = {
    ...globalConfig,
    params: {
      id: seekId,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.get(`${serverUrl}${Api.GetSeekInfoById}`, config);
}

/**
 * 获取指定用户id的所有求租信息
 * @param userId 用户id
 */
export async function getAllSeekInfoByUserId(userId: number): Promise<AxiosResponse<GetAllSeekInfoByUserIdResponse>> {
  const config = {
    ...globalConfig,
    params: {
      id: userId,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.get(`${serverUrl}${Api.GetAllSeekInfoByUserId}`, config);
}

/**
 * 获取所有求租信息
 */
export async function getAllSeekInfo(): Promise<AxiosResponse<GetAllSeekInfoByUserIdResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.get(`${serverUrl}${Api.GetAllSeekInfo}`, config);
}

/**
 * 删除指定id的求租信息
 * @param id 求租信息id
 */
export async function deleteSeekInfoById(id: number): Promise<AxiosResponse<DeleteSeekInfoByIdResponse>> {
  const config = {
    ...globalConfig,
    params: {
      id: id,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.delete(`${serverUrl}${Api.DeleteSeekInfoById}`, config);
}

/**
 * 更新指定id的求租信息
 * @param form 求租信息表单
 */
export async function updateSeekInfo(form: UpdateSeekForm): Promise<AxiosResponse<UpdateSeekInfoResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.post(`${serverUrl}${Api.UpdateSeekInfo}`, form, config);
}