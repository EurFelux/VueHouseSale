import { globalConfig, serverUrl } from './api';
import type { BuyForm, UpdateBuyForm } from '@/api/request';
import type { AddBuyResponse, GetAllBuyInfoByUserIdResponse, GetAllBuyInfoResponse, GetAllSellInfoByUserIdResponse, GetAllSellInfoResponse, GetBuyInfoByIdResponse, GetSellInfoByIdResponse, UpdateBuyInfoResponse } from '@/api/response';

import { useUserStore } from '@/stores/user';

import axios, { type AxiosResponse } from 'axios';

enum Api {
  AddBuy = '/sell/req/add',
  GetBuyInfoById = '/sell/req/byId',
  GetAllBuyInfoByUserId = '/sell/req/allById',
  GetAllBuyInfo = '/sell/req/all',
  DeleteBuyInfoById = '/sell/req/delete',
  UpdateBuyInfoById = '/sell/req/update',


}

/**
 * 添加求购信息
 * @param form 求购信息表单
 */
export function addBuy(form: BuyForm): Promise<AxiosResponse<AddBuyResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.post(`${serverUrl}${Api.AddBuy}`, form, config);
}


/**
 * 获取指定id的求购信息
 * @param buyId 求购信息id
 */
export function getBuyInfoById(buyId: number): Promise<AxiosResponse<GetBuyInfoByIdResponse>> {
  const config = {
    ...globalConfig,
    params: {
      id: buyId,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.get(`${serverUrl}${Api.GetBuyInfoById}`, config);
}

/**
 * 获取指定用户id的所有求购信息
 * @param userId 用户id
 */
export function getAllBuyInfoByUserId(userId: number): Promise<AxiosResponse<GetAllBuyInfoByUserIdResponse>> {
  const config = {
    ...globalConfig,
    params: {
      id: userId,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.get(`${serverUrl}${Api.GetAllBuyInfoByUserId}`, config);
}

/**
 * 获取所有求购信息
 */
export function getAllBuyInfo(): Promise<AxiosResponse<GetAllBuyInfoResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.get(`${serverUrl}${Api.GetAllBuyInfo}`, config);
}

/**
 * 删除指定id的求购信息
 * @param buyId 求购信息id
 */
export function deleteBuyInfoById(buyId: number): Promise<AxiosResponse<GetSellInfoByIdResponse>> {
  const config = {
    ...globalConfig,
    params: {
      id: buyId,
    },
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.delete(`${serverUrl}${Api.DeleteBuyInfoById}`, config);
}

/**
 * 更新指定id的求购信息
 * @param form 求购信息表单
 */
export function updateBuyInfoById(form: UpdateBuyForm): Promise<AxiosResponse<UpdateBuyInfoResponse>> {
  const config = {
    ...globalConfig,
    headers: {
      Authorization: useUserStore().authorization,
    }
  }

  return axios.post(`${serverUrl}${Api.UpdateBuyInfoById}`, form, config);
}
