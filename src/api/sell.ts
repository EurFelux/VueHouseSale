import { globalConfig, serverUrl } from './api';
import type { SellForm } from '@/api/request';
import type { AddSellResponse, GetAllSellInfoByUserIdResponse, GetAllSellInfoResponse, GetSellInfoByIdResponse } from '@/api/response';

import { useUserStore } from '@/stores/user';

import axios, { type AxiosResponse } from 'axios';

enum Api {
  AddSell = '/sell/info/add',
  GetSellInfoById = '/sell/info/byId',
  GetAllSellInfo = '/sell/info/all',
  GetAllSellInfoByUserId = '/sell/info/allById',

}

/**
 * 添加出售信息
 * @param form 出售信息表单
 */
export function addSell(form: SellForm): Promise<AxiosResponse<AddSellResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.post(`${serverUrl}${Api.AddSell}`, form, config);
}
/**
 * 获取指定id的出售信息
 * @param sellID 出售信息id
 */
export function getSellInfoById(sellID: number): Promise<AxiosResponse<GetSellInfoByIdResponse>> {
  const config = {
    ...globalConfig,
    params: {
      sellId: sellID,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.get(`${serverUrl}${Api.GetSellInfoById}`, config);
}

/**
 * 获取所有出售信息
 */
export function getAllSellInfo(): Promise<AxiosResponse<GetAllSellInfoResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.get(`${serverUrl}${Api.GetAllSellInfo}`, config);
}

/**
 * 获取指定用户的所有出售信息
 * @param userID 用户id
 */
export function getAllSellInfoByUserId(userID: number): Promise<AxiosResponse<GetAllSellInfoByUserIdResponse>> {
  const config = {
    ...globalConfig,
    params: {
      id: userID,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.get(`${serverUrl}${Api.GetAllSellInfoByUserId}`, config);
}