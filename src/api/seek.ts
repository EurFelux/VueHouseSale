import { globalConfig, serverUrl } from './api';
import type { BuyForm, SeekForm, SellForm } from '@/api/request';
import type { AddSeekResponse, DeleteSeekInfoByIdResponse, GetAllSeekInfoByUserIdResponse } from '@/api/response';

import { useUserStore } from '@/stores/user';

import axios, { Axios, type AxiosResponse } from 'axios';

enum Api {
  AddSeek = '/rent/req/add',
  GetAllSeekInfoByUserId = '/rent/req/allById',
  GetAllSeekInfo = '/rent/req/all',
  deleteSeekInfoById = '/rent/req/delete',
}

/**
 * 添加求租信息
 * @param form 求租信息表单
 */
export function addSeek(form: SeekForm): Promise<AxiosResponse<AddSeekResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.post(`${serverUrl}${Api.AddSeek}`, form, config);
}

/**
 * 获取指定用户id的所有求租信息
 * @param userId 用户id
 */
export function getAllSeekInfoByUserId(userId: number): Promise<AxiosResponse<GetAllSeekInfoByUserIdResponse>> {
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
export function getAllSeekInfo(): Promise<AxiosResponse<GetAllSeekInfoByUserIdResponse>> {
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
export function deleteSeekInfoById(id: number): Promise<AxiosResponse<DeleteSeekInfoByIdResponse>> {
  const config = {
    ...globalConfig,
    params: {
      id: id,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.delete(`${serverUrl}${Api.deleteSeekInfoById}`, config);
}